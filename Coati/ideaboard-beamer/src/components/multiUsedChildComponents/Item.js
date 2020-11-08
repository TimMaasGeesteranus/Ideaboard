import React from "react";

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: this.props.position,
            title: this.props.title,
            description: this.props.description,
            upvotes: this.props.upvotes,
            showComponent: true,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.upvotes !== prevProps.upvotes) {
            this.setState({upvotes: this.props.upvotes})
        }
        if (this.props.description !== prevProps.description) {
            this.setState({description: this.props.description})
        }
        if (this.props.title !== prevProps.title) {
            this.setState({title: this.props.title})
        }
    }

    test() {
        this.setState(
            {showComponent: !this.state.showComponent}
        )
    }

    trimString = (string) => {
        return string.length > 175 ?
            string.substring(0, 175 - 3) + "..." :
            string;
    };

    useTags = () => {
        let string = this.trimString(this.state.description);
        return {__html: string};
    };

    render() {
        return <div className="tile is-vertical notification is-primary tilePrimary">
            <div className="item-tile tile">
                <article className="position-tile tile is-child is-1">
                    <p className="has-background-primary is-size-1">{this.state.position}</p>
                </article>
                <article className="tile is-child">
                    <p className="title">{this.state.title}</p>
                    <p className="subtitle" dangerouslySetInnerHTML={this.useTags()}></p>
                </article>
                <article className={`vote-tile tile is-child is-1 is-size-1`}>
                    <p className="title number has-background-info is-size-4"><span className="icon"><i className="fas fa-chevron-up"></i></span>{this.state.upvotes}</p>
                </article>
            </div>
        </div>
    }
}

export default Item;