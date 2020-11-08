import React from 'react';
import '../../../App.css'
import '../../../Comments.css'
import 'bulma/css/bulma.css'
import * as ReactRedux from "react-redux";
import {Comment} from "./Comment"
import {getAllCommentsOnIdeaIDActionMiddleware} from "../../../../actions/commentsActions";
import {postCommentActionMiddleware} from "../actions/commentActions";

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            replies: [],
            text: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    handleSubmit(event) {
        let userId = sessionStorage.getItem("user");
        this.props.postComment(this.props.idea._id, userId, this.state.text);
        this.props.getAllComments(this.props.idea._id);
        event.preventDefault();
    }

    loggedIn = () => {
        if (this.props.loggedIn) {
            return <div className="comment-box">
                <form onSubmit={this.handleSubmit}>
                    <textarea placeholder="Wat zijn uw gedachten?" value={this.state.text}
                              onChange={this.handleChange}> </textarea>
                    <div className="comment-panel">
                        <div className="comment_as">Reactie van
                            <div className="username"> {sessionStorage.getItem("username")}</div></div>
                        <input type="submit" value="REACTIE" className="comment-button"/>
                    </div>
                </form>
            </div>
        } else {
            return null;
        }
    };

    mapComments(comments) {
        const replies = comments.map((comment) =>
            <Comment key={comment._id} {...comment}/>
        );
        this.setState({replies: replies.reverse()})
    }

    componentDidUpdate(prevProps) {
        if (prevProps.idea !== this.props.idea && this.props.idea !== null) {
            this.props.getAllComments(this.props.idea._id);
        }
        if (prevProps.comments !== this.props.comments && this.props.comments !== null) {
            this.setState({comments: this.props.comments});
            this.mapComments(...this.props.comments);
        }
    }

    render() {
        return (
            <div className="comment-card is-primary">
                <span id="comments">Reacties</span>
                <span id="comments-count">({this.state.replies.length})</span>
                {this.loggedIn()}
                <div className="replies-box">
                    {this.state.replies}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments.comments,
        loggedIn: state.authentication.loggedIn
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllComments: (id) => dispatch(getAllCommentsOnIdeaIDActionMiddleware(id)),
        postComment: (ideaId, userId, text) => dispatch(postCommentActionMiddleware(ideaId, userId, text)),
    }
}

const CommentListComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CommentList);
export {CommentListComponent as CommentList};
