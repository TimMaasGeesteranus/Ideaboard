import React from 'react';
import '../App.css';
import 'bulma/css/bulma.css'
import NavBar from "../multiUsedChildComponents/Navbar";
import * as ReactRedux from "react-redux";
import {register} from "../../actions/userActions";
import {Link} from "react-router-dom";

class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                email: '',
                firstName: '',
                lastName: '',
                password: '',
            },
            submitted: false,
        };
    }

    handleChange = (event)=> {
        const {name, value} = event.target;
        this.setState({[name]: value});
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    };

    handleSubmit = (event)=>{
        event.preventDefault();
        this.setState({submitted: true});
        const {user} = this.state;
        if (user.firstName && user.lastName && user.email && user.username && user.password) {
            this.props.register(user);
        }
    };

    render() {

        const {user, submitted} = this.state;

        let dangerClassNameUserName = (submitted && !user.username ? ' is-danger' : '');
        let dangerClassNamePassword = (submitted && !user.password ? ' is-danger' : '');

        let notification;
        if (this.props.registering) {
            notification = <div className="notification is-success is-size-7-mobile">Je bent geregistreerd</div>
        }
        return (
            <div>
                <NavBar newLocation={"/"} text={"Terug"} title={"Register"}/>

                <section className="hero is-fullheight is-medium is-primary is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <article className=" card is-rounded">
                                    <div className=" card-content">
                                        <h1 className=" title">
                                            Registratieformulier
                                        </h1>
                                        {notification}
                                        <form name="form" onSubmit={(e) => this.handleSubmit(e)}>
                                            <h1>Registreer nu door dit formulier in te vullen</h1><br></br>

                                            {/*USERNAME*/}
                                            <p className="control has-icon form-control">
                                                Gebruikersnaam

                                                <input onChange={(e) => this.handleChange(e)}
                                                       id={"inputUsername"}
                                                       className={'input' + dangerClassNameUserName}
                                                       name="username" defaultValue={user.username} type="text"
                                                       placeholder="Gebruikersnaam"></input>
                                            </p>

                                            {/*E-MAIL*/}
                                            <p className="control has-icon form-control">
                                                E-mail

                                                <input onChange={(e) => this.handleChange(e)}
                                                       id={"inputEmail"}
                                                       className={'input' + dangerClassNameUserName}
                                                       name="email" defaultValue={user.email} type="email"
                                                       placeholder="E-mail"></input>
                                            </p>

                                            {/*FIRSTNAME*/}
                                            <p className="control has-icon form-control">
                                                Voornaam

                                                <input onChange={(e) => this.handleChange(e)}
                                                       id={"inputFirstname"}
                                                       className={'input' + dangerClassNameUserName}
                                                       name="firstName" defaultValue={user.firstName} type="text"
                                                       placeholder="Voornaam"></input>
                                            </p>

                                            {/*LASTNAME*/}
                                            <p className="control has-icon form-control">
                                                Achternaam

                                                <input onChange={(e) => this.handleChange(e)}
                                                       id={"inputLastname"}
                                                       className={'input' + dangerClassNameUserName}
                                                       name="lastName" defaultValue={user.lastName} type="text"
                                                       placeholder="Achternaam"></input>
                                            </p>

                                            {/*PASSWORD*/}
                                            <p className="control has-icon form-control">
                                                Wachtwoord
                                                <input onChange={(e) => this.handleChange(e)}
                                                       id={"inputPassword"}
                                                       className={'input' + dangerClassNamePassword} type="password"
                                                       name="password" defaultValue={user.password}
                                                       placeholder="Wachtwoord"></input>
                                            </p>

                                            <br></br>

                                            {/*BUTTON*/}
                                            <p className="control">
                                                <button
                                                    id="registerButton"
                                                    className="button is-primary is-medium is-fullwidth">
                                                    <i className="fa fa-user"></i>
                                                    Registreer
                                                </button>
                                                <Link to="/login" className="btn btn-link">Annuleer</Link>
                                            </p>
                                        </form>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
            ;
    }
}

function mapStateToProps(state) {
    return {
        registering: state.registration.registering,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (user) => dispatch(register(user)),
    }
}

const RegisterScreenComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
export {RegisterScreenComponent as RegisterScreen};
