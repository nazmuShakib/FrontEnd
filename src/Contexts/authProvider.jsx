import {
	createContext,
	useState,
	useMemo,
	useCallback,
} from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const [auth, setAuth] = useState(null)
	const persistData = JSON.parse(localStorage.getItem('persist')) || { state: false, expiry: Date.now() }
	const [persist, setPersist] = useState(persistData)
	const login = useCallback((user) => {
		setAuth(user)
	}, [])
	const logout = useCallback(() => {
		setAuth(null)
	}, [])

	const rememberMe = useCallback((state) => {
		const data = {
			state,
			expiry: Date.now() + 100 * 60 * 1000,
		}
		localStorage.setItem('persist', JSON.stringify(data))
		setPersist(data)
	}, [])
	const forget = useCallback(() => {
		const data = {
			state: false,
			expiry: Date.now() - 10,
		}
		setPersist(data)
		localStorage.removeItem('persist')
	}, [])
	const memoizedValue = useMemo(() => ({
		auth, persist, rememberMe, forget, login, logout,
	}), [auth, persist, rememberMe, forget, login, logout])

	return (
		<AuthContext.Provider value={memoizedValue}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContext
