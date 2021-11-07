import { Component } from "react";
import NumericInput from "react-numeric-input";

export default class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            resistance: '',
            sets: '',
            repeats: '',
            muscle: '',

        }
        this.nextButton = props.nextButton;
        this.step1 = props.step1;
    }
    isDone(state) {
        const d = (str) => str !== undefined && str !== null && str.length !== 0;
        this.nextButton.current.disabled = !(d(state.name) &&
            d(state.resistance) &&
            d(state.sets) &&
            d(state.repeats) &&
            d(state.muscle));
    }

    render() {
        return (
            <>
                <input
                    disabled
                    style={{ marginBottom: '20px' }}
                    value={this.state.muscle}
                />
                <input
                    placeholder='exercise name'
                    value={this.state.name}
                    onChange={
                        (e) => {
                            this.setState({
                                name: e.target.value,
                            });
                            var status = { ...this.state };
                            status.name = e.target.value;
                            this.isDone(status);
                        }
                    }
                />
                <div className='d-flex justify-content-between'>

                    <div style={{ marginTop: '20px' }}>
                        <NumericInput
                            min={0}
                            max={10000}
                            value={this.state.resistance}
                            placeholder='resistance (number)'
                            step={0.5}
                            onChange={(e) => {
                                this.setState({
                                    resistance: e,
                                });
                                var status = { ...this.state };
                                status.resistance = e;
                                this.isDone(status);
                            }}
                            format={(num) => `${num}kg`} />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <NumericInput
                            min={0}
                            max={10000}
                            value={this.state.sets}
                            placeholder='sets (number)'
                            step={1}
                            onChange={(e) => {
                                this.setState({
                                    sets: e,
                                });
                                var status = { ...this.state };
                                status.sets = e;
                                this.isDone(status);
                            }}
                            format={(num) => `${num}sets`} />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <NumericInput
                            min={0}
                            max={10000}
                            value={this.state.repeats}
                            placeholder='repeats (number)'
                            step={1}
                            onChange={(e) => {
                                this.setState({
                                    repeats: e,
                                });
                                var status = { ...this.state };
                                status.repeats = e;
                                this.isDone(status);
                            }}
                            format={(num) => `${parseInt(num)}reps`} />
                    </div>
                </div>
            </>
        )
    }
}