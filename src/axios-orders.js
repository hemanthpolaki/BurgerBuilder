import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-hp7.firebaseio.com/'
})

export default instance;