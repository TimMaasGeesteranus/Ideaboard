import React from 'react';
import '../../App.css';
import 'bulma/css/bulma.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as ReactRedux from "react-redux";
import {postIdeaToServerMiddleware} from "./actions/NewIdeaActions";
import NavBar from "../../multiUsedChildComponents/Navbar";
import {createBrowserHistory} from "history";
import {toast} from 'react-toastify';

export const history = createBrowserHistory();

class NewIdea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            text: ""
        }
    }

    modules = {
        toolbar: [
            [{'header': [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ]
    };

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    handleTitleChange = (event) => {
        const value = event.target.value;
        this.setState({title: value});
    };

    handleTextChange = (value) => {
        this.setState({text: value});
    };

    handleSubmit = (event) => {
        const options = {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        };

        let text = this.state.text;
        let title = this.state.title;
        let userId = sessionStorage.getItem('user');
        let boardName = this.props.boardName;
        if (userId !== null) {
            if (text === "" || title === "") {
                toast.warn('Vul alle velden in', options);
            } else {
                this.props.postIdea(boardName, userId, text, title);
                this.setState({
                    text: "",
                    title: ""
                });
                history.goBack();
            }
        } else {
            toast.warn('Log u eerst in', options);
        }
        event.preventDefault();
    };

    goBack = (event) => {
        history.goBack();
        event.preventDefault()
    };

    render() {
        return <div>
            <NavBar newLocation={"/login"} text={"Log in"} title={this.props.boardName}
                    loggedIn={this.props.loggedIn} username={this.props.username}/>
            <section className="hero is-fullheight is-medium is-primary is-bold">
                <div className="m-10 mt-40 gradient">
                    <form onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label className="label">Titel</label>
                            <div className="control">
                                <input id={"inputTitle"} value={this.state.title} onChange={this.handleTitleChange}
                                       name="title" className="input" type="text" placeholder="Vul een titel in.."/>
                            </div>
                        </div>
                        <div className="mb-10 quill-editor">
                            <ReactQuill
                                name="text"
                                value={this.state.text}
                                onChange={this.handleTextChange}
                                modules={this.modules}
                                formats={this.formats}
                                placeholder="Plaats een beschrijving van het idee.."/>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button id={"buttonPlaatsen"} className="button is-link">Plaatsen</button>
                            </div>
                            <div className="control">
                                <button id={"buttonCancel"} type="cancel" onClick={this.goBack}
                                        className="button is-text">Annuleren
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        ideas: state.ideas.ideas,
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.username,
        boardName: state.board.boardName,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        postIdea: (boardName, userId, text, title) => dispatch(postIdeaToServerMiddleware(boardName, userId, text, title)),
    }
}

const IdeasComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(NewIdea);
export {IdeasComponent as Ideas};
