import React from 'react';
import '../../../App.css';
import 'bulma/css/bulma.css'

export class ShareButtonYammer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                customButton: true, //false by default. Pass true if you are providing your own button to trigger the share popup
                classSelector: 'yj-default-share-button',//if customButton is true, you must pass the css class name of your button (so we can bind the click event for you)
                defaultMessage: `Zie dit fantastische idee: "${this.props.title}"`, //optionally pass a message to prepopulate your post
/*                pageUrl: 'www.microsoft.com' //current browser url is used by default. You can pass your own url if you want to generate the OG object from a different URL.*/
            }
        };
    }

    componentDidUpdate(prevProps) {
        // only update if the data has changed
        if (prevProps.title !== this.props.title && this.props.title !== null) {
            this.setState({options: {defaultMessage: `Zie dit fantastische idee: "${this.props.title}"`}});
            this.loadScripts();
        }
    }

    scriptLoaded() {
        window.yam.platform.yammerShare(this.state.options);
        window.yam.platform.yammerShare();
    }

    loadScripts(){
        const script1 = document.createElement("script");
        script1["data-app-id"] = "HqJTEa1dVkMph0RCErFX4g";
        script1.src = "https://c64.assets-yammer.com/assets/platform_js_sdk.js";
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement("script");
        script2.src = "https://s0.assets-yammer.com/assets/platform_social_buttons.min.js";
        script2.async = true;
        script2.onload = () => this.scriptLoaded();
        document.body.appendChild(script2);
    }

    componentDidMount() {
       this.loadScripts()

    }

    render() {
        return (
            <span id="yj-share-button"/>
        );
    }
}



