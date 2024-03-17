import {
	createContext,
	useState,
	useMemo,
	useCallback,
} from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const [auth, setAuth] = useState(null)
	const login = useCallback((user) => {
		setAuth(user)
	}, [])

	const logout = useCallback(() => {
		setAuth(null)
	}, [])

	const memoizedValue = useMemo(() => ({ auth, login, logout }), [auth, login, logout])

	return (
		<AuthContext.Provider value={memoizedValue}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContext
