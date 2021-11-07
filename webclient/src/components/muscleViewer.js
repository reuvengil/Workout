import { Component } from "react";
import IMAGES from "../images/index";
export default class MuscleViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            body: IMAGES.front,
            main: '',
            secondary: '',
        }
    }

    render() {
        return <div style={{
            position: 'relative'
        }}>
            <img src={this.state.body} alt="" style={{ position: 'absolute', right: '0', top: '0', backgroundColor: 'white' }} />
            <img src={this.state.main} alt="" style={{ position: 'absolute', right: '0', top: '0' }} />
            <img src={this.state.secondary} alt="" style={{ position: 'absolute', right: '0', top: '0' }} />
        </div>;
    }
}