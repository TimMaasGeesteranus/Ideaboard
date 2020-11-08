import React from 'react';
import * as ReactRedux from "react-redux";
import Item from "../../multiUsedChildComponents/Item";
import Qrcode from './childComponents/Qrcode'
import {Spring} from "react-spring/renderprops";
import {IdeaCarousel} from "../IdeaCarouselUI/IdeaCarousel";
import {toggleNewIdeaBoolean} from "../../../actions/ideasActions";

class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChanged: false,
            titleChanged: '',
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.ideas !== prevProps.ideas && this.props.ideas !== null) {
            if (prevProps.ideas !== undefined) {
                for (let i = 0; i < this.props.ideas.length; i++) {
                    if (this.props.ideas[i].title !== prevProps.ideas[i].title) {
                        this.setState({titleChanged: this.props.ideas[i].title});
                        return;
                    }
                }
                this.setState({titleChanged: ''});
            }
        }
    }

    addUpvoteSpring(content) {
        return <Spring
            from={{opacity: 0, marginRight: 400}}
            to={{opacity: 1, marginRight: 0}}
        >
            {props => (
                <div className="tile is-vertical notification is-primary tilePrimary" key={props} style={props}>
                    {content}
                </div>
            )}
        </Spring>
    }

    addIdeaSpring(content) {
        return <Spring
            from={{opacity: 0}}
            to={{opacity: 1}}
        >
            {props =>
                <div style={props}>
                    {content}
                </div>}
        </Spring>;
    }

    render() {
        let carousel = null;
        let ideaArray = [];
        let ideas = this.props.ideas;
        for (let item in ideas) {
            if (this.state.titleChanged === ideas[item].title) {
                ideaArray.push(
                    this.addUpvoteSpring(<Item key={item}
                                               position={Number(item) + 1}
                                               title={ideas[item].title}
                                               description={ideas[item].text}
                                               upvotes={ideas[item].numberOfUpVotes}/>)
                );
            } else {
                ideaArray.push(
                    <Item key={item}
                          position={Number(item) + 1}
                          title={ideas[item].title}
                          description={ideas[item].text}
                          upvotes={ideas[item].numberOfUpVotes}/>
                )
            }
        }

        if (this.props.newIdea === true) {
            carousel = this.addIdeaSpring(
                <article className="message newIdeasMessage">
                    <IdeaCarousel slider={false} items={ideaArray}/>
                </article>);
            //Change this to an action!
            this.props.toggleNewIdeaBoolean();
        } else {
            carousel = <article className="message newIdeasMessage">
                <IdeaCarousel slider={true} items={ideaArray}/>
            </article>;
        }

        return <div className="tile is ancestor is-vertical">
            <h1 className="title board-title has-text-centered is-size-1">{this.props.boardName}</h1>
            <div className="tile is-vertical">
                {ideaArray}
            </div>
            <div className="is-flex QRcode-line">
                <article className="message is-info">
                    <div className="message-header">
                        <p>QR-code</p>
                    </div>
                    <div className="message-body columns">
                        <ol className="column">
                            <li>Open de Ideeenbord applicatie</li>
                            <li>Richt de camera van je toestel op de QR-code</li>
                            <li>Zorg ervoor dat de QR-code in het midden van het vierkant wordt gescand</li>
                            <li>De app wordt geopend</li>
                        </ol>
                        <Qrcode boardName={this.props.boardName}/>
                    </div>
                </article>
                {carousel}
                <article className="message is-info">
                </article>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        ideas: state.ideas.ideas,
        error: state.ideas.error,
        boardName: state.board.boardName,
        errorBoard: state.board.error,
        newIdea: state.ideas.newIdea
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleNewIdeaBoolean: () => dispatch(toggleNewIdeaBoolean())
    }
}

const ItemListComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ItemList);
export {ItemListComponent as ItemList};
