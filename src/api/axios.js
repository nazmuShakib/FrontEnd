import axios from 'axios'

const BASE_URL = 'http://localhost:5173'

export default axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
})

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
})
