import React, { Component } from "react";
import requests from "../api/Requests";
import InstallationNavbar from "./installationNavbar";
import Step1 from "./step1";
import Step2 from "./step2";
export default class CreateNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh_button_disabled: true,
            step: 1,
        }
        this.nextButton = React.createRef();
        this.backButton = React.createRef();
        this.title = React.createRef();
        this.step1 = React.createRef();
        this.step2 = React.createRef();
    }
    componentDidMount() {
        this.nextButton.current.addEventListener('click', async (e) => {
            e.preventDefault();
            if (this.title.current.state.finishMode) {
                var training = {
                    muscle_group: this.step1.current.category,
                    sub_muscle_group: this.step1.current.group,
                    training: this.step2.current.state.name,
                    sets: `${this.step2.current.state.sets}sets`,
                    reps: `${this.step2.current.state.repeats}reps`,
                    resistance: `${this.step2.current.state.resistance}kg`,
                };
                var res = await requests.createTraining(training);
                if (res.data.success) {
                    window.location.href = 'http://localhost:3000/showWorkout';
                } else {
                    alert("connection error!")
                }
            } else {
                switch (this.state.step) {
                    case 1:
                        this.title.current.setState({
                            step: 2,
                            finishMode: true,
                        });
                        this.step2.current.setState({
                            muscle: `${this.step1.current.category} - ${this.step1.current.group}`
                        });
                        break;
                    default: break;
                }
                this.setState({
                    step: 2,
                });
                this.backButton.current.disabled = false;
                this.nextButton.current.disabled = true;
            }
        })
        this.backButton.current.addEventListener('click', (e) => {
            e.preventDefault();
            switch (this.state.step) {
                case 2:
                    this.title.current.setState({
                        step: 1,
                        finishMode: false,
                    });
                    this.nextButton.current.disabled = false;
                    break;
                default: break;
            }
            this.setState({
                step: 1,
            });
            this.backButton.current.disabled = true;
            this.nextButton.current.disabled = false;
        })
    }
    render() {
        return (
            <div className="flex-column">
                <InstallationNavbar
                    ref={this.title}
                    nextButton={this.nextButton}
                    backButton={this.backButton}
                    step={this.state.step} />
                <div className={`d-flex justify-content-between ${this.state.step === 1 ? '' : 'd-none'}`}
                    style={{
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        minWidth: '580px',
                    }}><Step1 ref={this.step1} nextButton={this.nextButton} /></div>
                <div className={`d-flex flex-column form control autocomplete ${this.state.step === 2 ? '' : 'd-none'}`}
                    style={{
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        minWidth: '580px',
                    }}><Step2 ref={this.step2} nextButton={this.nextButton} /></div>
            </div>
        )
    }
}

