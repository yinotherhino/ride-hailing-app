import axios from 'axios';

export default function axiosPost (url, reqBody) {
    axios.post(url, reqBody, {withCredentials:true})
}

const axiosGet = (url) => {
    axios.post(url, {withCredentials:true})
}

