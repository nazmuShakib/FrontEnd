import {
	memo, useEffect, useState, useCallback,
} from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'
import useRefreshToken from '../../Hooks/useRefreshToken'

const ProtectedRoute = memo(() => {
	const { auth, persist } = useAuth()
	const [loading, setLoading] = useState(true)
	const refresh = useRefreshToken()
	const location = useLocation()
	const refreshCallback = useCallback(refresh, [refresh])
	useEffect(() => {
		let isMounted = true
		const verifyRefreshToken = () => {
			refreshCallback()
			if (isMounted) setLoading(false)
		}
		if (!auth?.accessToken && persist?.state) {
			verifyRefreshToken()
		} else {
			setLoading(false)
		}
		return () => {
			isMounted = false
			return isMounted
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth?.accessToken, persist?.state])
	if (!persist?.state || persist?.expiry < Date.now()) {
		return <Navigate to="/login" state={{ from: { pathname: location.pathname } }} />
	}
	if (loading) return <h1>Loading...</h1>

	return <Outlet />
})
export default ProtectedRoute
