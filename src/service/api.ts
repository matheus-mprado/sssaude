import axios from 'axios'

export const api = axios.create({
    baseURL:'https://lmgassociados.com.br/cadastrossb/api'
})