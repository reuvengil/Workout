import httpClient from 'axios'
import cookie from 'react-cookies';

const axios = httpClient.create({
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': cookie.load('token'),
    }
})

const requests = {
    login: async function (name, password) {
        return await axios.post('http://localhost:9000/apprentice/signin', { name, password });
    },
    register: async function (name, password) {
        return axios.post('http://localhost:9000/apprentice/create', { name, password });
    },
    connected: async function () {
        return await axios.get('http://localhost:9000/apprentice/isconnected');
    },
    muscleGroups: async function () {
        return await axios.get('http://localhost:9000/muscles/muscle_group');
    },
    muscleCategory: async function () {
        return await axios.get('http://localhost:9000/muscles/muscle_category');
    },
    muscleInfo: async function () {
        return await axios.get('http://localhost:9000/muscles/muscleInfo');
    },
    createTraining: async function (training) {
        return await axios.post('http://localhost:9000/training/create', training);
    },
    updateTraining: async function (oldTraining, newTraining) {
        return await axios.post('http://localhost:9000/training/update', { old: oldTraining, new: newTraining });
    },
    deleteTraining: async function (training) {
        return await axios.post('http://localhost:9000/training/delete', { id: training._id });
    },
    getListOfTraining: async function () {
        return await axios.get('http://localhost:9000/training/');
    }
}

export default requests;