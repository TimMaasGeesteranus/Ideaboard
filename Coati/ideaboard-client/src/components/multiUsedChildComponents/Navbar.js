import React from 'react';
import '../App.css';
import 'bulma/css/bulma.css'
import {NavLink} from "react-router-dom";
import {logout} from '../../actions/userActions';
import * as ReactRedux from "react-redux";
import SearchBar from "../UIComponents/ContentUI/childComponents/SearchBar";

class Navbar extends React.Component {


    showStateOfAccount = () => {
        const
            handleClick = () => {
                this.props.logout();
            };

        if (this.props.loggedIn === true) {
            return (
                <div>
                    <p id={"userNameNavBar"}>{this.props.username}</p>
                    <form>
                        <button className="button is-light logout-button" onClick={handleClick}>
                            Log uit
                        </button>
                    </form>
                </div>
            )
        } else {
            return (
                <NavLink to={this.props.newLocation}>
                    <button id="navbarButton" className="button is-light green-button">
                        {this.props.text}
                    </button>
                </NavLink>
            )
        }
    };

    showSearchBar = () => {
        if(this.props.isOverview) {
            return <div className="navbar-row2">
                <SearchBar resetPage={this.props.resetPage}/>
            </div>
        }
        else
            return null;
    };

    render() {
        return (
            <div>
                <div className="navbar level is-fixed-top">
                    <div className="navbar-row1">
                        <div className="navbar-item">
                            <h1 className="title is-size-5-mobile">{this.props.title}</h1>
                        </div>
                        <div className="level-right">
                            <div className="navbar-item">
                                {this.showStateOfAccount()}
                            </div>
                        </div>
                    </div>
                    {this.showSearchBar()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {}

}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Navbar);

