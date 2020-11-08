import React from 'react';
import '../../../App.css';
import 'bulma/css/bulma.css'
import * as ReactRedux from "react-redux";
import SearchBar from 'react-js-search';
import {getIdeasActionMiddleware} from "../../../../actions/ideasActions";
import {saveSearchTextAction, successAction} from "../../../../actions/currentIdeasActions";

class SearchBarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            found: "",
            typingTimer: "",
            doneTypingInterval: 500
        }
    }

    componentDidUpdate() {
        if (document.activeElement.type !== "text") {
            this.resetSearchBar();
        }
    }

    resetSearchBar() {
        this.props.saveSearchText(null);
        this.props.saveCurrentIdeas(this.props.ideas);
    }

    hideButton() {
        let content = document.getElementById("searchBar");
        if (content !== null) {
            let button = content.getElementsByTagName("button");
            button[0].style.visibility = "hidden";
        }
    }

    typing = (text, found) => {
        clearTimeout(this.state.typingTimer);
        if (text) {
            this.setState({
                typingTimer:
                    setTimeout(() => {
                        this.searchIdea(text, found);
                    }, this.state.doneTypingInterval)
            });
        } else {
            this.resetSearchBar();
        }
        this.props.resetPage();
    };

    searchIdea = (text, found) => {
        this.props.saveCurrentIdeas(found);
        this.props.saveSearchText(text);
    };

    onSearchClick(text, found) {

    }

    render() {
        return (
            <div id="searchBar">
                <p className="searchBarTextPlease">Zoek naar ideeën</p>
                <SearchBar
                    placeholder={"Search here..."}
                    onSearchTextChange={(term, hits) => {
                        this.typing(term, hits)
                    }}
                    onSearchButtonClick={this.onSearchClick}
                    data={this.props.ideas}
                />
                {this.hideButton()}
                <br></br>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ideas: state.ideas.ideas,
        currentIdeas: state.currentIdeas.currentIdeas,
        searchText: state.currentIdeas.searchText
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveCurrentIdeas: (ideas) => dispatch(successAction(ideas)),
        saveSearchText: (text) => dispatch(saveSearchTextAction(text)),
        getIdeasFromServer: (boardName) => dispatch(getIdeasActionMiddleware(boardName))
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SearchBarComponent);
