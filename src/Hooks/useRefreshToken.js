import { useQuery } from 'react-query'
import axios from 'axios'
import useAuth from './useAuth'

const fetchData = async () => axios({
	method: 'GET',
	url: 'http://localhost:3000/user/refreshToken',
	withCredentials: true,
})

const useRefreshToken = () => {
	const { login, logout, persist } = useAuth()
	const { data, error } = useQuery(['refreshToken'], fetchData, {
		cacheTime: 60 * 1000,
		retry: false,
		enabled: persist,
		refetchInterval: 60 * 1000,
		refetchIntervalInBackground: true,
	})
	if (error?.response?.status === 401) {
		return () => {
			logout()
			return null
		}
	}
	const refresh = () => {
		login({ accessToken: data?.data?.accessToken, userID: data?.data?.userID })
		return data?.data?.accessToken
	}
	return refresh
}

export default useRefreshToken
