import React from 'react';
import 'bulma/css/bulma.css'
import '../../App.css';
import {Route, Switch} from "react-router-dom";
import {LoginScreen} from "../LoginScreen";
import {Content} from "../ContentUI/Content";
import {RegisterScreen} from "../RegisterScreen";
import {ProfileScreen} from "../ProfileScreen";

import {DetailPage} from "../DetailPageUI/DetailPage";
import {Ideas} from "../NewIdeaUI/NewIdea";
import * as ReactRedux from "react-redux";
import {Slide, toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {openWebSocket} from "./actions/webSocketActions";
import {getUserIdeasOnIDActionMiddleware} from "../../../actions/userActions";
import {getIdeasActionMiddleware, toggleNewIdeaBoolean} from "../../../actions/ideasActions";
import {getIdeaOnIDActionMiddleware} from "../../../actions/ideaActions";
import {successAction} from "../../../actions/currentIdeasActions";
import {getAllCommentsOnIdeaIDActionMiddleware} from "../../../actions/commentsActions";

class App extends React.Component {

    componentDidMount() {
        toast.configure();
        this.onOpenSocket();
    }

    onOpenSocket() {
        let ws = openWebSocket();
        ws.onerror = async () => {
            await this.addMessage('WebSocket error');
            toast.error('    💩 Websocket error!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        };
        ws.onopen = () => this.addMessage('WebSocket connection established');
        ws.onclose = () => this.addMessage('WebSocket connection closed');
        ws.onmessage = (msg) => this.addMessage(JSON.parse(msg.data));
    };

    updateCurrentIdeas(){
        let currentIdeasArray = [];
        for(let idea in this.props.ideas){
            for(let currentIdea in this.props.currentIdeas){
                if(this.props.ideas[idea]._id === this.props.currentIdeas[currentIdea]._id){
                    currentIdeasArray.push({...this.props.ideas[idea]});
                }
            }
        }
        this.props.saveCurrentIdeas(currentIdeasArray);
    }

    async addMessage(msg) {
        switch (msg.type) {
            case 'upvote':
                await this.props.getIdeasFromServer(this.props.boardName);

                console.log(this.props.currentIdea)
                if(this.props.currentUser) {
                    this.props.getIdeas(this.props.currentUser);
                }
                if(this.props.currentIdea){
                    this.props.getIdeaOnID(this.props.currentIdea);
                }
                if(this.props.currentIdeas){
                    this.updateCurrentIdeas();
                }
                break;
            case 'newIdea':
                this.props.getIdeasFromServer(this.props.boardName);
                if( this.props.currentUser) {
                    this.props.getIdeas(this.props.currentUser);
                }
                toast.info('😸 Er is een nieuw bericht gepost!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                this.props.toggleNewIdeaBoolean();
                break;
            case 'newComment':
                if(this.props.currentIdea) {
                    this.props.getIdeaOnID(this.props.currentIdea);
                }
                toast.info('😸 Er is een nieuwe reactie gepost!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                break;
            default:
        }
    };


    render() {
        return (
            <div className="component-app">
                <Switch>
                    <Route exact path="/" render={(routeProps) => <Content{...routeProps}/>}/>
                    <Route path="/login" render={(routeProps) => <LoginScreen{...routeProps}/>}/>
                    <Route path="/register" render={(routeProps) => <RegisterScreen{...routeProps}/>}/>
                    <Route path="/comment/:boardName" render={(routeProps) => <Ideas{...routeProps}/>}/>
                    <Route path="/detailpage/:id" render={(routeProps) => <DetailPage{...routeProps}/>}/>
                    <Route path="/profile/:id" render={(routeProps) => <ProfileScreen{...routeProps}/>}/>
                </Switch>
                <ToastContainer
                    transition={Slide}
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        ideas: state.ideas.ideas,
        newIdea: state.ideas.newIdea,
        boardName: state.board.boardName,
        currentIdea: state.idea.currentIdea,
        currentUser: state.users.currentUser,
        currentIdeas: state.currentIdeas.currentIdeas
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getIdeasFromServer: (boardName) => dispatch(getIdeasActionMiddleware(boardName)),
        toggleNewIdeaBoolean: () => dispatch(toggleNewIdeaBoolean),
        getIdeas: (id) => dispatch(getUserIdeasOnIDActionMiddleware(id)),
        getIdeaOnID: (id) => dispatch(getIdeaOnIDActionMiddleware(id)),
        getAllComments: (id) => dispatch(getAllCommentsOnIdeaIDActionMiddleware(id)),
        saveCurrentIdeas: (ideas) => dispatch(successAction(ideas))
    }
}


const AppComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
export default AppComponent;

