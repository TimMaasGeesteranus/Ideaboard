import React from 'react';
import '../../../App.css';
import 'bulma/css/bulma.css'
import NavBar from "../../../multiUsedChildComponents/Navbar";
import Idea from "../../../multiUsedChildComponents/Idea";
import * as ReactRedux from "react-redux";
import {getIdeasActionMiddleware} from "../../../../actions/ideasActions";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';
import SearchBar from "./SearchBar";
import {nextAction, previousAction, resetAction, setLastPageAction} from "../actions/paginationActions";
let slicedArray;
let ideaArray;


class Overview extends React.Component {

    componentDidMount() {
        this.props.getIdeasFromServer(this.props.boardName);
    }

    paginate = (array, numberOfItemsPerPage, currentPage) => {
        currentPage--;
        let lastPage = array.length / numberOfItemsPerPage;
        if (lastPage % 1 !== 0) {
            lastPage = Math.floor(lastPage);
            lastPage++;
        }
        this.props.setLastPage(lastPage);
        return array.slice(currentPage * numberOfItemsPerPage, (currentPage + 1) * numberOfItemsPerPage);
    };

    render() {
        ideaArray = [];
        let ideas = [];
        if(this.props.currentIdeas === undefined){
            ideas = this.props.ideas;
        } else{
            ideas = this.props.currentIdeas;
        }
        for (let item in ideas) {
                ideaArray.push(
                <div key={item}>
                    <Idea item = {ideas[item]} title={ideas[item].title} numberOfUpVotes={ideas[item].numberOfUpVotes} body={ideas[item].text} id={ideas[item]._id}  itemId={item}/>
                </div>
                );
        }

        slicedArray = this.paginate(ideaArray, this.props.numberOfItemsPerPage, this.props.currentPage);
        let classNameOverview;
        if(this.props.loggedIn)
            classNameOverview = "ideas-overview-loggedIn";
        else
            classNameOverview = "ideas-overview";

        return (
            <div>
                <NavBar newLocation={"/login"} text={"Log in"} title={this.props.boardName}
                        loggedIn={this.props.loggedIn} username={this.props.username} resetPage={this.props.resetPage} isOverview={true}/>
                <div className={classNameOverview}>
                    <section className="section is-block ">
                        <div className="container">
                            {slicedArray}
                            <div className="buttons-pagination">
                                {ideaArray.length !== 0 && this.props.currentPage !== 1 && <span onClick={this.props.handlePrevious} className="button is-primary">Previous</span>}
                                {ideaArray.length !== 0 && this.props.currentPage !== this.props.lastPage && <span onClick={this.props.handleNext} className="button is-primary is-pulled-right">Next</span>}
                            </div>
                        </div>
                    </section>
                </div>
                <div className="fab-custom">
                    <Fab id={"fabButton"} style={{backgroundColor: '#101087'}} component={Link} to={`/comment/${this.props.boardName}`} color="primary" aria-label="Add">
                        <AddIcon/>
                    </Fab>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ideas: state.ideas.ideas,
        loading: state.ideas.loading,
        error: state.ideas.error,
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.username,
        boardName: state.board.boardName,
        currentIdeas: state.currentIdeas.currentIdeas,
        currentPage: state.pagination.currentPage,
        numberOfItemsPerPage: state.pagination.numberOfItemsPerPage,
        lastPage: state.pagination.lastPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleNext: () => dispatch(nextAction()),
        handlePrevious: () => dispatch(previousAction()),
        resetPage: () => dispatch(resetAction()),
        setLastPage: (lastPage) => dispatch(setLastPageAction(lastPage)),
        getIdeasFromServer: (boardName) => dispatch(getIdeasActionMiddleware(boardName))
    }
}

const OverviewComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Overview);
export {OverviewComponent as Overview};
