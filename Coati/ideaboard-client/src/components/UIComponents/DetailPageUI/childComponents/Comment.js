import React from 'react';
import '../../../App.css';
import 'bulma/css/bulma.css'
import * as ReactRedux from "react-redux";
import Moment from 'react-moment';
import 'moment-timezone';
import {getUserOnIDActionMiddleware} from "../../../../actions/userActions";
import {NavLink} from "react-router-dom";

class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
        }
    }

    componentDidMount = async () => {
        await this.props.getUser(this.props.userId);
        await this.setState({user: this.props.user});
        if (this.props.user === null) {
            this.setState({user: 'Anonymous'})
        }
    };

  render() {
        return (
            <div className="reply">
                <div id="top">
                    <span id="username"><NavLink
                        to={`/profile/${this.state.user._id}`}><b>{this.state.user.username}</b>
                    </NavLink>
                        </span>
                    <span id="date"> <Moment fromNow>{this.props.date}</Moment></span>
                </div>
                <div id="content">
                    <p className="content-body">{this.props.text}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.users.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: (id) => dispatch(getUserOnIDActionMiddleware(id))
    }
}

const CommentComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Comment);
export {CommentComponent as Comment};
