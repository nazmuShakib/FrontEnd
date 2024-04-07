import {
	createContext,
	useState,
	useMemo,
	useEffect,
	useCallback,
} from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const [auth, setAuth] = useState({})
	const [sessionTime, setSessionTime] = useState(JSON.parse(localStorage.getItem('sessionTime')) || -1)
	const [persist, setPersist] = useState(sessionTime >= Date.now())
	const rememberMe = useCallback(() => {
		setPersist(true)
		const sessionExpiry = Date.now() + 10 * 60 * 1000
		setSessionTime(sessionExpiry)
		localStorage.setItem('sessionTime', JSON.stringify(sessionExpiry))
	}, [])
	const forget = useCallback(() => {
		setPersist(false)
		setSessionTime(-1)
		localStorage.removeItem('sessionTime')
	}, [])
	const login = useCallback((user) => {
		setAuth(user)
		rememberMe()
	}, [rememberMe])
	const logout = useCallback(() => {
		setAuth(null)
		forget()
	}, [forget])
	const checkLogout = useCallback(() => {
		if (sessionTime < Date.now()) {
			logout()
		}
	}, [sessionTime, logout])
	useEffect(() => {
		const interval = setInterval(checkLogout, 60 * 1000)
		return () => clearInterval(interval)
	}, [checkLogout])
	const memoizedValue = useMemo(() => ({
		auth, persist, login, logout, checkLogout,
	}), [auth, persist, login, logout, checkLogout])

	return (
		<AuthContext.Provider value={memoizedValue}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContext
