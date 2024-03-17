import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchData = () => axios({
	method: 'GET',
	url: 'http://localhost:3000/user/refreshToken',
	withCredentials: true,
})

const useRefreshToken = () => {
	const [fetch, setFetch] = useState(0)
	const refreshQuery = useQuery([fetch], fetchData, { retry: false })
	const refresh = () => {
		setFetch((prev) => prev + 1)
		if (refreshQuery.data) {
			return refreshQuery.data.data?.accessToken
		}
		return null
	}
	return refresh
}

export default useRefreshToken
