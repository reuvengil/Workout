import React, { Component } from "react";
import Refresh from "@material-ui/icons/Refresh";
import AutoComplete from "./autoComplete";
import MuscleViewer from "./muscleViewer";
import IMAGES from "../images/index";
import requests from "../api/Requests";

class Step1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refresh_button_disabled: true,
        }
        this.nextButton = props.nextButton;
        this.muscle_category = React.createRef();
        this.muscle_group = React.createRef();
        this.muscleViewer = React.createRef();
    }
    async componentDidMount() {
        this.muscle_category_data = (await requests.muscleCategory()).data;

        this.muscle_category.current.setState({
            data: this.muscle_category_data,
            text: '',
        });

        this.muscle_group_data = (await requests.muscleGroups()).data;

        this.muscle_group.current.setState({
            data: this.muscle_group_data,
            text: '',
        });
    }
    render() {
        return (
            <>
                <form autoComplete='off' style={{
                    width: '300px',
                }}>
                    <AutoComplete
                        id='muscle_category'
                        hint='muscle category'
                        ref={this.muscle_category}
                        callbackOnSelection={(item) => {
                            this.muscle_category.current.setState({
                                disabled: true,
                            })
                            this.muscle_group.current.setState({
                                disabled: false,
                                data: this.muscle_group_data.filter(i => i.category.includes(item.id)),
                            })
                            this.muscle_group.current.setFocus();
                            this.setState({
                                refresh_button_disabled: false
                            });
                            this.category = item.name;
                        }} />
                    <AutoComplete
                        id='muscle_group'
                        hint='muscle group'
                        disabled
                        ref={this.muscle_group}
                        callbackOnSelection={(item) => {
                            this.muscle_group.current.setState({
                                disabled: true,
                            });
                            this.muscleViewer.current.setState({
                                body: item.is_front ? IMAGES.front : IMAGES.back,
                                main: IMAGES.main[item.id],
                                secondary: IMAGES.secondary[item.id],
                            });
                            this.nextButton.current.disabled = false;
                            this.group = item.name;
                        }} />
                    <button id='refresh'
                        className='btn btn-warning'
                        style={{ display: this.state.refresh_button_disabled ? 'none' : 'block' }}
                        disabled={this.state.refresh_button_disabled}
                        onClick={(e) => {
                            e.preventDefault();
                            this.muscle_group.current.setState({
                                text: '',
                                disabled: true,
                            });
                            this.muscle_category.current.setState({
                                text: '',
                                disabled: false,
                            });
                            this.muscle_category.current.setFocus();
                            this.nextButton.current.disabled = true;
                            this.muscleViewer.current.setState({
                                body: IMAGES.front,
                                main: '',
                                secondary: '',
                            });
                            this.setState({ refresh_button_disabled: true });
                        }}>
                        {<Refresh />}
                    </button>
                </form>
                <MuscleViewer ref={this.muscleViewer} />
            </>)
    }
}

export default Step1;