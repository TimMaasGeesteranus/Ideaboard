import React from "react";
import {Spring} from "react-spring/renderprops-universal";

class SpringComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
        }
    }

    render() {
        let content = this.state.content;
        return <div>
            <Spring
                from={{opacity: 0}}
                to={{opacity: 1}}
            >
                {props => <div style={props}>
                    {content}
                </div>}
            </Spring>
        </div>
    }

}

export default SpringComponent;