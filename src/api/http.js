import axios from 'axios'

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/api'
}

axios.defaults.timeout = 20000

export function get(url) {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}