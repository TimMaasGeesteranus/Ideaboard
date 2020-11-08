import * as React from "react";
import * as ReactRedux from "react-redux";
import NavBar from "../multiUsedChildComponents/Navbar";
import Idea from "../multiUsedChildComponents/Idea";
import {
    getUserIdeasOnIDActionMiddleware,
    getUserOnIDActionMiddleware,
    saveCurrentUser
} from "../../actions/userActions";

class ProfileScreen extends React.Component {

    componentDidMount = async () => {
        await this.props.saveCurrentUser(this.props.match.params.id);
        await this.props.getIdeas(this.props.match.params.id);
        await this.props.getUser(this.props.match.params.id);
    };

    trimString(input) {
        if (input) {
            let string = input.toString();
            return string.substr(0, 10);
        }
    }

    render() {
        let ideaArray = [];
        let ideas = this.props.userIdeas;
        for (let item in ideas) {
            ideaArray.push(
                <div key={item}>
                    <Idea item = {ideas[item]} title={ideas[item].title} numberOfUpVotes={ideas[item].numberOfUpVotes} body={ideas[item].text} id={ideas[item]._id}  itemId={item}/>
                </div>
            );
        }
        return (
            <div>
                <NavBar newLocation={"/"} text={"Terug"} title={"IdeaBoard Schiphol"}/>
                <div className="profileCard">
                    <div className=" card">
                        <div className="card-header">
                            <p className="card-header-title">
                                {this.props.user.firstName} {this.props.user.lastName}
                            </p>
                        </div>
                        <div className="card-content">
                            <p>
                                Gebruikersnaam: {this.props.user.username}<br></br>
                                E-mail: {this.props.user.email}<br></br>
                                Lid sinds: {this.trimString(this.props.user.createdAt)}<br></br>
                            </p>
                        </div>
                    </div>
                    <br></br>
                    <div className="title">Ideeën:</div>
                    {ideaArray}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.users.user,
        userIdeas: state.users.userIdeas
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: (id) => dispatch(getUserOnIDActionMiddleware(id)),
        getIdeas: (id) => dispatch(getUserIdeasOnIDActionMiddleware(id)),
        saveCurrentUser: (id) => dispatch(saveCurrentUser(id))
    }}

const ProfileScreenComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
export {ProfileScreenComponent as ProfileScreen};
