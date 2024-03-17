import { memo, useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../../Hooks/useAuth'
// import useRefreshToken from '../../Hooks/useRefreshToken'

const ProtectedRoute = memo(() => {
	const { auth } = useAuth()
	const [loading, setLoading] = useState(true)
	// const refresh = useRefreshToken()
	// useEffect(() => {
	// 	const verifyRefreshToken = () => {
	// 		try {
	// 			refresh()
	// 		} catch (err) {
	// 			console.log(err)
	// 		} finally {
	// 			setLoading(false)
	// 		}
	// 	}
	// 	if (!auth?.accessToken) {
	// 		verifyRefreshToken()
	// 	} else {
	// 		setLoading(false)
	// 	}
	// 	// if (auth?.accessToken) setLoading(true)
	// }, [auth, refresh])

	// useEffect(() => {
	// 	if (auth?.accessToken) setLoading(true)
	// }, [auth])
	// const refresh = useRefreshToken()
	// refresh()
	if (!auth?.accessToken) {
		return <Navigate to="/login" />
		// 	refresh()
	}
	// if (loading) return <h1>Loading...</h1>
	// const navigate = useNavigate()
	// const redirect = useEffect(() => navigate('/login', { replace: true }))
	return <Outlet />
	// return <Navigate to="/login" replace />
})
export default ProtectedRoute
