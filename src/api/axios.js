import axios from 'axios'

export default axios.create({
	baseURL: import.meta.env.BACKEND_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

export const axiosPrivate = axios.create({
	baseURL: import.meta.env.BACKEND_URL,
	withCredentials: true,
})
