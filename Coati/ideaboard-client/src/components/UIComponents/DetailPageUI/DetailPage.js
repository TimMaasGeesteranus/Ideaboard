import React from 'react';
import '../../App.css';
import 'bulma/css/bulma.css'
import * as ReactRedux from "react-redux";
import {fingerprintMiddleware, upVoteActionMiddleware} from "../../../actions/upvoteActions";
import {ShareButtonYammer} from "./childComponents/ShareButtonYammer";
import {getIdeaOnIDActionMiddleware, saveCurrentIdea} from "../../../actions/ideaActions";
import {CommentList} from "./childComponents/CommentList";
import NavBar from "../../multiUsedChildComponents/Navbar";
import {getUserOnIDActionMiddleware} from "../../../actions/userActions";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";


class DetailPage extends React.Component {

    componentDidMount = async () => {
        await this.props.saveCurrentIdea(this.props.match.params.id);
        await this.props.getIdeaOnID(this.props.match.params.id);
        await this.props.getUser(this.props.idea.userId);
    };

    async fingerprintIsInUpvotedPeople() {
        await this.props.getIdeaOnID(this.props.match.params.id);
        if (this.props.idea.upvotedPeople.includes(sessionStorage.getItem("fingerprint"))) {
            return true;
        } else {
            return false;
        }
    }

    useTags = (text) => {
        if (text !== undefined) return {__html: text};
    };

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
                this.props.fingerprintToServer(sessionStorage.getItem('boardId'), id, sessionStorage.getItem("fingerprint"));
                this.props.upVoteToServer(id, this.props.boardName);
            } else {
                toast.warn('🦄 U mag maar 1x stemmen!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }
    }

    render() {
        return (
            <div>
                <NavBar newLocation={"/"} text={"Terug"} title={"IdeaBoard Schiphol"}/>
                <article className="titleIdea">
                    <div className="message-header has-background-primary">
                        {this.props.idea.title}
                        <button onClick={() => {
                            this.handleClick(this.props.match.params.id)
                        }} className="button has-background-white" id="upvoteButton">
                            <div>{this.props.idea.numberOfUpVotes}</div>
                            <span className="icon">
                            <i className="fas fa-lg fa-arrow-circle-up"/>
                        </span>
                        </button>
                    </div>
                    <div className="text" dangerouslySetInnerHTML={this.useTags(this.props.idea.text)}>
                    </div>
                    <div className="username">
                        Aangemaakt door: <NavLink
                        to={`/profile/${this.props.user._id}`}><b>{this.props.user.username}</b>
                    </NavLink>
                    </div>
                    <div className="share-button">
                        <ShareButtonYammer title={this.props.idea.title}/>
                    </div>
                </article>
                <CommentList idea={this.props.idea}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        idea: state.idea.idea,
        user: state.users.user,
        boardName: state.board.boardName,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        upVoteToServer: (id, boardName) => dispatch(upVoteActionMiddleware(id, boardName)),
        getIdeaOnID: (id) => dispatch(getIdeaOnIDActionMiddleware(id)),
        getUser: (id) => dispatch(getUserOnIDActionMiddleware(id)),
        fingerprintToServer: (boardId, ideaId, fingerprint) => dispatch(fingerprintMiddleware(boardId, ideaId, fingerprint)),
        saveCurrentIdea: (id) => dispatch(saveCurrentIdea(id))
    }
}

const DetailPageComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DetailPage);
export {DetailPageComponent as DetailPage};
