import React from 'react';
import 'bulma/css/bulma.css'
import '../../App.css';
import * as ReactRedux from "react-redux";
import {ItemList} from '../../UIcomponents/ItemListUI/ItemList';
import {getBoardNameActionMiddleware} from "./actions/boardActions";
import {getIdeasActionMiddleware, toggleNewIdeaBoolean} from "../../../actions/ideasActions";
import {openWebSocket} from "./actions/webSocketActions";
import {getNewestIdeasActionMiddleware} from "../IdeaCarouselUI/actions/carouselActions";

class App extends React.Component {

    componentDidMount() {
        this.props.getBoardNameFromServer();
        this.onOpenSocket();
    }

    onOpenSocket() {
        let ws = openWebSocket();
        ws.onerror = () => this.addMessage('WebSocket error');
        ws.onopen = () => this.addMessage('WebSocket connection established');
        ws.onclose = () => this.addMessage('WebSocket connection closed');
        ws.onmessage = (msg) => this.addMessage(JSON.parse(msg.data));
    };

    addMessage(msg) {
        switch (msg.type) {
            case 'upvote':
                this.props.getIdeasFromServer(this.props.boardName);
                this.props.getTopFiveIdeas(this.props.boardName);
                break;
            case 'newIdea':
                this.props.toggleNewIdeaBoolean();
                break;
            default:
        }
    };

    render() {
        if (this.props.boardNameIsLoaded) {
            return (
                <div className="container">
                    <ItemList/>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <p>Loading</p>
                </div>
            )
        }
    }

}

function mapStateToProps(state) {
    return {
        boardNameIsLoaded: state.board.boardNameIsLoaded,
        boardName: state.board.boardName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getBoardNameFromServer: () => dispatch(getBoardNameActionMiddleware()),
        getIdeasFromServer: (boardName) => dispatch(getIdeasActionMiddleware(boardName)),
        toggleNewIdeaBoolean: () => dispatch(toggleNewIdeaBoolean()),
        getTopFiveIdeas: (boardName) => dispatch(getNewestIdeasActionMiddleware(boardName))

    }
}

const AppComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
export default AppComponent;
