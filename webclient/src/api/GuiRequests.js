import React from "react"
import { useAsync } from "react-async"
import requests from "./Requests";
import Navbar from "../components/navbar";
import WorkOutTable from "../components/table";
const connected = async () => {
    return (await requests.connected()).data;
}

const trainingList = async () => {
    return (await requests.getListOfTraining()).data;
}

const LoadTheRightContent = ({ options }) => {
    const { data, error } = useAsync({ promiseFn: connected });
    if (data && data.auth) {
        return <options.true apprentice={data.apprentice} />
    }
    if (error) {
        console.log(error);
    }
    return <options.false />;
}
const NeedToCreateSignOutButton = ({ props }) => {
    const { data, error } = useAsync({ promiseFn: connected });
    props.connected = data && data.auth;
    if (error) {
        console.log(error);
    }
    return <Navbar state={props} />;
}

function TrainingTable() {
    const { data, error } = useAsync({ promiseFn: trainingList });
    if (error) {
        console.log(error);
    }
    if (data) {
        return <WorkOutTable data={data} />
    }
    return <></>
}

const guiRequests = {
    loadTheRightContent: function (options) {
        return <LoadTheRightContent options={options} />;
    },
    createNavbar: function (props) {
        return <NeedToCreateSignOutButton props={props} />;
    },
    createTable: function (props) {
        return <TrainingTable />;
    }

}
export default guiRequests;