//React dependencies
import React from "react";
//Redux dependencies
import * as ReactRedux from 'react-redux';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getNewestIdeasActionMiddleware} from "./actions/carouselActions";
import Item from "../../multiUsedChildComponents/Item";

import SpringComponent from "./childComponents/SpringComponent";

class IdeaCarouselUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            animation: false,
            slider: this.props.slider,
            ideaArray: [],
            title: this.props.title
        };
    }

    componentDidMount() {
        this.props.getTopFiveIdeas(this.props.boardName);
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.items !== this.props.items) && (this.props.items !== null)) {
            this.setState({
                items: this.props.items,
                ideaArray: []
            });
            this.setState({
                animation: true
            })
        }
    }
  
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000
        };
        let returnCode = null;
        let slider = null;

        if (this.props.items !== null && this.state.ideaArray.length === 0) {
            for (let item in this.props.items) {
                this.state.ideaArray.push(
                    <div className = "idea-carousel" key={item}>
                        <Item key={item}
                              title={this.props.items[item].title}
                              description={this.props.items[item].text}
                              upvotes={this.props.items[item].numberOfUpVotes}
                        /></div>
                );
            }
        }

        if (this.state.slider === true) {
            slider = <Slider {...settings}>
                {this.state.ideaArray}
            </Slider>
        } else {
            slider = '';
        }

        let springContent = <div>
                <div className="message-header">
                    <p>Nieuwste ideeën</p>
                </div>
                <div className="message-body columns">
                </div>
            </div>;

        returnCode = <div id="newIdeas">
            <SpringComponent content={springContent}/>
            {slider}
        </div>;
        return returnCode
    }
}

function mapStateToProps(state) {
    return {
        boardName: state.board.boardName,
        items: state.carousel.ideas
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTopFiveIdeas: (boardName) => dispatch(getNewestIdeasActionMiddleware(boardName))
    }
}

export const IdeaCarousel = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(IdeaCarouselUI);
