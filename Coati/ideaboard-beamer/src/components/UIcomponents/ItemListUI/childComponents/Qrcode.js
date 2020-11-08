import React from "react";
import QRCode from 'qrcode';

let opts = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    rendererOpts: {
        quality: 0.3
    }
};

class Qrcode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardName: null,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.boardName !== prevProps.boardName) {
            this.setState({boardName: this.props.boardName})
        }

        let boardName = this.props.boardName;
        if (boardName !== undefined && boardName !== null) {
            QRCode.toDataURL(boardName, opts, function (err, url) {
                if (err) throw err;
                let img = document.getElementById('image');
                img.src = url
            });
        }
    }

    render() {
        return <div className="tile image column is-pulled-right">
            <figure className="image 128x128">
                <img id="image" alt="QRCode" width={128} height={128}/>
            </figure>
        </div>
    }
}

export default Qrcode;