import {
	memo, useEffect, useState, useCallback,
} from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'
import useRefreshToken from '../../Hooks/useRefreshToken'

const ProtectedRoute = memo(() => {
	const { auth, persist, checkLogout } = useAuth()
	const [loading, setLoading] = useState(true)
	const refresh = useRefreshToken()
	const location = useLocation()
	const refreshCallback = useCallback(refresh, [refresh])
	useEffect(() => {
		let isMounted = true
		const verifyRefreshToken = async () => {
			try {
				await refreshCallback()
			} catch (err) {
				console.log(err)
			} finally {
				if (isMounted) setLoading(false)
			}
		}
		checkLogout()
		if (!auth && persist) {
			verifyRefreshToken()
		} else {
			setLoading(false)
		}
		return () => {
			isMounted = false
			return isMounted
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	if (!persist) {
		return <Navigate to="/login" state={{ from: { pathname: location.pathname } }} />
	}
	if (loading) return <h1>Loading...</h1>

	return <Outlet />
})
export default ProtectedRoute
