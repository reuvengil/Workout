// import MUIDataTable from "mui-datatables";
import { Component } from "react";
import requests from "../api/Requests";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apprentice_name: props.apprentice.name,
            muscles: []
        }
    }
    async componentDidMount() {
        this.setState({
            muscles: (await requests.muscleInfo()).data,
        });
    }
    render() {

        return (
            <>
                <h1 className='text-light text-center mt-2 mb-2 label label-default'>
                    <u>Welcome {this.state.apprentice_name}</u>
                </h1>
                <div className="container text-light text-center">
                    <h5>To create a new workout, please click the "Create New Workout" button.
                        To start an existing workout, please click the "Show Workout" button.
                    </h5>
                    <h4><u>Muscles List:</u></h4>
                    {this.state.muscles.map(muscle => {
                        return (<>
                            <h5>{`${muscle.category}:`}</h5>
                            <h6>{muscle.groups.map((m, i) => {
                                return (i + 1) !== muscle.groups.length ? `${m} ,` : m;
                            })}</h6>
                        </>)
                    }
                    )}
                </div>
            </>
        );
    }
}