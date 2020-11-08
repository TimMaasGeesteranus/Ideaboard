import React, {Component} from 'react'
import QrReader from 'react-qr-reader'
import {Overview} from "./childComponents/Overview";
import {confirmSuccessfulLoginAction} from "../../../actions/userActions";
import * as ReactRedux from "react-redux";
import Fingerprint2 from "fingerprintjs2"
import {getBoardNameActionMiddleware, saveBoardNameInReduxAction} from "./actions/boardActions";
import {getIdeasActionMiddleware, toggleNewIdeaBoolean} from "../../../actions/ideasActions";
import {toast} from "react-toastify";
import * as boardAction from "./actions/boardActions";

class Content extends Component {



    generateFingerprint = () => {
        let fingerprint;

        if (window.requestIdleCallback) {
            requestIdleCallback(()=> {
                Fingerprint2.get((components) => {
                    var values = components.map((component) => {
                        return component.value
                    });
                    if(fingerprint !== null) {
                        fingerprint = Fingerprint2.x64hash128(values.join(''), 31);
                        sessionStorage.setItem("fingerprint", fingerprint);
                        return fingerprint;
                    }
                })
            })
        }else{
            setTimeout(()=> {
                window.Fingerprint2.get( (components) =>{
                    var values = components.map((component) => {
                        return component.value
                    });
                    if(fingerprint !== null){
                        fingerprint = window.Fingerprint2.x64hash128(values.join(''), 31);
                        sessionStorage.setItem("fingerprint", fingerprint);
                        return fingerprint;
                    }
                })
            }, 500)
        }
    };

    handleScan = data => {
        if (data) {
            this.setState({
                    result: data
            });
            this.props.getBoardNameFromServer();
        }
    };

    handleError = err => {
        toast(`💩 Error van! ${err}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        console.error(err)
    };

    checkContent = () => {
        // const boardName = 'Ideaboard Schiphol';

        let boardName = this.props.boardName;
        if (this.props.loggedIn) {
            this.generateFingerprint();
            return (<Overview boardName={boardName}/>)
        } else if (this.props.boardName === undefined) {
            return (
                <div className="Qr-code">
                    <p className="has-background-primary has-text-centered">Scan uw bord</p>
                    <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{width: '100%'}}
                    />
                </div>)
        } else {
            this.generateFingerprint();
            return (<Overview boardName={boardName}/>)
        }
    };

    workAroundForTest = () => {
        this.generateFingerprint();
        this.props.saveBoardName('IdeaBoard Schiphol');
        return(<Overview/>);
    };


    render() {

        return (
            <div className="content is-large">

                {/*Comment dit stuk code om het scannen van de QR-Code over te slaan*/}
                {this.checkContent()}
                {/*{this.workAroundForTest()}*/}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        loggedIn: state.authentication.loggedIn,
        showLoginNotification: state.authentication.showLoginNotification,
        newIdea: state.ideas.newIdea,
        boardName: state.board.boardName,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeLoginNotification: () => dispatch(confirmSuccessfulLoginAction()),
        getIdeasFromServer: (boardName)=> dispatch(getIdeasActionMiddleware(boardName)),
        toggleNewIdeaBoolean: ()=> dispatch(toggleNewIdeaBoolean),
        getBoardNameFromServer: () => dispatch(getBoardNameActionMiddleware()),
        saveBoardName: (boardName) => dispatch(saveBoardNameInReduxAction(boardName))
    }
}

const ContentComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Content);
export {ContentComponent as Content};