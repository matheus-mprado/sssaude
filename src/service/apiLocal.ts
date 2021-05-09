import axios from 'axios'

export const apiLocal = axios.create({
    baseURL:'http://localhost:3000/api'
})