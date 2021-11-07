import { Component } from "react";
import apiGuiRequests from "../api/GuiRequests"
export default class ShowWorkout extends Component {
    render() {
        return apiGuiRequests.createTable();
    }
}