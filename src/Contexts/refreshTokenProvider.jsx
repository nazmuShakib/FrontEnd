import {
	createContext,
	useState,
	useMemo,
	useCallback,
	useEffect,
} from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import useAuth from '../Hooks/useAuth'

const RefreshContext = createContext(null)

const fetchData = () => axios({
	method: 'GET',
	url: 'http://localhost:3000/user/refreshToken',
	withCredentials: true,
})

export function RefreshProvider({ children }) {
	const { login } = useAuth()
	const [fetch, setFetch] = useState(0)
	const refresh = useQuery([fetch], fetchData, { retry: false })
	useEffect(() => {
		if (refresh.isSuccess) {
			const authData = {
				auth: !!refresh.data.data?.accessToken,
				accessToken: refresh.data.data?.accessToken,
			}
			login(authData)
		} else if (refresh.isError) {
			login(null)
		}
	}, [refresh, login])
	console.log(fetch, refresh)
	const updateRefreshToken = useCallback(() => {
		console.log(fetch)
		setFetch(fetch + 1)
	}, [fetch])
	const memoizedValue = useMemo(() => ({ updateRefreshToken }), [updateRefreshToken])
	return (
		<RefreshContext.Provider value={memoizedValue}>
			{children}
		</RefreshContext.Provider>
	)
}
export default RefreshContext
