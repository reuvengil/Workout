import React, { Component } from "react";

export default class InstallationNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finishMode: false,
            step: props.step,
        }
        this.nextButton = props.nextButton;
        this.backButton = props.backButton;
        this.steps = {
            1: <>Step 1/2<small> - choose the selected muscle</small></>,
            2: <>Step 2/2<small> - choose your desired exercise</small></>,
        }
    }
    render() {
        return (
            <div
                className="installation-navbar"
                style={{
                    marginBottom: '20px',
                }}>
                <h3>{this.steps[this.state.step]}</h3>
                <div>
                    <button disabled className="btn btn-danger mx-1" ref={this.backButton}>Back</button>
                    <button disabled className="btn btn-success mx-1" ref={this.nextButton}>{this.state.finishMode ? 'Finish' : 'Next'}</button>
                </div>
            </div>
        );
    }
}