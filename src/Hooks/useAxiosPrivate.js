import { useEffect } from 'react'
import { axiosPrivate } from '../api/axios'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'

const useAxiosPrivate = () => {
	const refresh = useRefreshToken()
	const { auth } = useAuth()
	useEffect(() => {
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config) => {
				const reqConfig = config
				if (!reqConfig.headers.Authorization) {
					reqConfig.headers.Authorization = `Bearer ${auth.accessToken}`
				}
				return reqConfig
			},
			(error) => Promise.reject(error),
		)
		const responseIntercept = axiosPrivate.interceptors.response.use((response) => response, async (error) => {
			const prevReq = error?.config
			try {
				refresh()
				prevReq.headers.Authorization = `Bearer ${auth?.accessToken}`
				return axiosPrivate(prevReq)
			} catch (err) {
				return Promise.reject(err)
			}
		})
		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept)
			axiosPrivate.interceptors.response.eject(responseIntercept)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth?.accessToken])
	return axiosPrivate
}
export default useAxiosPrivate
