import React from 'react';
import '../App.css';
import 'bulma/css/bulma.css'
import * as ReactRedux from "react-redux";
import {fingerprintMiddleware, upVoteActionMiddleware} from "../../actions/upvoteActions";
import {NavLink} from "react-router-dom";
import {getIdeaOnIDActionMiddleware} from "../../actions/ideaActions";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Highlighter from "react-highlight-words";

class Idea extends React.Component {

    async fingerprintIsInUpvotedPeople() {
        await this.props.getIdeaOnID(this.props.id);
        if (this.props.idea.upvotedPeople.includes(sessionStorage.getItem("fingerprint"))) {
            return true;
        } else {
            return false;
        }
    }

    async handleClick(id) {
        let isInUpvotedPeople = await this.fingerprintIsInUpvotedPeople();
        if ((sessionStorage.getItem("fingerprint") === null) || (sessionStorage.getItem("fingerprint") === undefined)) {
            toast.error(' 💩 De fingerprint is ongeldig!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        } else {
            if (!isInUpvotedPeople) {
                this.props.upVoteToServer(id, this.props.boardName);
                this.props.fingerprintToServer(sessionStorage.getItem('boardId'), id, sessionStorage.getItem("fingerprint"));

            } else {
                toast.warn('🦄 U mag maar 1x stemmen!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            }
        }
    }

    trimString = (string) => {
        return string.length > 200 ?
            string.substring(0, 200 - 3) + "..." :
            string;
    };

    useTags = () => {
        let string = this.trimString(this.props.body);
        return {__html: string};
    };

    getText(id) {
        if (document.getElementById(id) !== null) {
            let text = document.getElementById(id).innerText;
            return text;
        }
    }

    render() {

        let uniqueId = this.props.title.replace(/\s/g, '');
        let uniqueIdText = uniqueId.concat("text");

        return (
            < article className="message is-primary">
                <div className="message-header">
                    <NavLink id={uniqueId} to={`/detailpage/${this.props.id}`}>
                        <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[this.props.searchText]}
                        autoEscape={true}
                        textToHighlight={this.props.title}
                    />
                    </NavLink>
                    <button onClick={() => {
                        this.handleClick(this.props.id)
                    }} className="button">
                        <div>{this.props.numberOfUpVotes}</div>
                        <span className="icon">
                                <i className="fas fa-lg fa-arrow-circle-up"/>
                        </span>
                    </button>
                </div>


                {/*<div className="message-body">*/}
                {/*<Highlighter*/}
                {/*highlightClassName="YourHighlightClass"*/}
                {/*searchWords={[this.props.searchText]}*/}
                {/*autoEscape={true}*/}
                {/*textToHighlight={this.getText(uniqueIdText)}*/}
                {/*/>*/}
                {/*</div>*/}

                <div id={uniqueIdText} className="message-body" dangerouslySetInnerHTML={this.useTags()}>

                </div>
            </article>
        );
    }
}

function mapStateToProps(state) {
    return {
        ideas: state.ideas.ideas,
        idea: state.idea.idea,
        boardName: state.board.boardName,
        searchText: state.currentIdeas.searchText
    }
}

function mapDispatchToProps(dispatch) {
    return {
        upVoteToServer: (id, boardName) => dispatch(upVoteActionMiddleware(id, boardName)),
        fingerprintToServer: (boardId, ideaId, fingerprint) => dispatch(fingerprintMiddleware(boardId, ideaId, fingerprint)),
        getIdeaOnID: (id) => dispatch(getIdeaOnIDActionMiddleware(id))
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Idea);