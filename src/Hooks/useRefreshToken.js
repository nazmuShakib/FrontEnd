import { useQuery } from 'react-query'
import axios from 'axios'
import useAuth from './useAuth'

const fetchData = async () => axios({
	method: 'GET',
	url: 'http://localhost:3000/user/refreshToken',
	withCredentials: true,
})

const useRefreshToken = () => {
	const { login } = useAuth()
	const { data } = useQuery([], fetchData, { retry: false, cacheTime: 5 * 60 * 1000 })
	const refresh = () => {
		login({ accessToken: data?.data?.accessToken })
	}
	return refresh
}

export default useRefreshToken
