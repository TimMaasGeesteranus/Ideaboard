import * as React from 'react';
import '../App.css';
import 'bulma/css/bulma.css'
import NavBar from "../multiUsedChildComponents/Navbar";
import * as ReactRedux from "react-redux";
import {
    loginToServerWithoutFurtherHandling,
    passwordChangeAction,
    usernameChangeAction
} from "../../actions/userActions";
import {NavLink} from "react-router-dom";

class LoginScreenUI extends React.Component {

    render() {
        const usernameChangeHandler = evt => this.props.usernameChangeHandler(evt.target.value);
        const passwordChangeHandler = evt => this.props.passwordChangeHandler(evt.target.value);
        const loginHandler = () => this.props.loginToServerWithoutFurtherHandling(this.props.username, this.props.password);

        const {username, password, submitted} = this.props;
        let dangerClassNameUserName = (submitted && !username ? ' is-danger' : '');
        let dangerClassNamePassword = (submitted && !password ? ' is-danger' : '');

        let notification;
        if (this.props.alert !== null) {
            notification = <div
                className={`notification is-size-7-mobile is-danger`}>{this.props.alert}</div>
        }

        return (
            <div>
                <NavBar newLocation={"/"} text={"Terug"} title={"Login"}/>

                <section className="hero is-fullheight is-medium is-primary is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <article className=" card is-rounded">
                                    <div className=" card-content">
                                        <h1 className=" title">
                                            Login
                                        </h1>
                                        {notification}

                                        <p className="control has-icon form-control">
                                            <i className="fa fa-user"/>
                                            Gebruikersnaam
                                            <input onChange={usernameChangeHandler}
                                                   className={'input' + dangerClassNameUserName}
                                                   id={"inputUsername"}
                                                   name="username" defaultValue={username} type="text"
                                                   placeholder="Username"/>
                                        </p>
                                        {submitted && !username &&
                                        <div className="help is-danger">Gebruikersnaam is vereist</div>
                                        }
                                        <p className="control has-icon form-control">
                                            <i className="fa fa-lock"/>
                                            Wachtwoord
                                            <input onChange={passwordChangeHandler}
                                                   className={'input' + dangerClassNamePassword} type="password"
                                                   id ={'inputPassword'}
                                                   name="password" defaultValue={password}
                                                   placeholder="Password"/>
                                        </p>
                                        {submitted && !password &&
                                        <div className="help is-danger">Wachtwoord is vereist</div>
                                        }
                                        <p className="control">
                                            <button
                                                onClick={loginHandler}
                                                className="button is-primary is-medium is-fullwidth"
                                                id={"loginButton"}>
                                                <i className="fa fa-user"/>
                                                Login
                                            </button>
                                        </p>
                                        <br></br>
                                        <p>Geen account? <NavLink to={"/register"}>
                                            <u id="register">Registreer nu!</u></NavLink></p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.authentication.username,
        password: state.authentication.password,
        submitted: state.authentication.submitted,
        loggedIn: state.authentication.loggedIn,
        alert: state.authentication.alert
    }
}

function mapDispatchToProps(dispatch) {
    return {
        usernameChangeHandler: (username) => dispatch(usernameChangeAction(username)),
        passwordChangeHandler: (password) => dispatch(passwordChangeAction(password)),
        loginToServerWithoutFurtherHandling: (username, password) => dispatch(loginToServerWithoutFurtherHandling(username, password))
    }
}

export const LoginScreen = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(LoginScreenUI);
