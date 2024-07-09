import {
	createContext,
	useState,
	useMemo,
	useCallback,
} from 'react'

import { Snackbar, Alert } from '@mui/material'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
	const [notification, setNotification] = useState(null)

	const openNotification = useCallback((message, type, duration = 5000) => {
		setNotification({
			open: true, message, type, duration,
		})
	}, [])

	const closeNotification = useCallback(() => {
		setNotification(null)
	}, [])

	const memoizedValue = useMemo(() => ({
		openNotification, closeNotification,
	}), [openNotification, closeNotification])
	return (
		<NotificationContext.Provider value={memoizedValue}>
			{children}
			{notification && (
				<Snackbar open={notification.open} autoHideDuration={notification.duration} onClose={closeNotification}>
					<Alert severity={notification.type} variant="filled">{notification.message}</Alert>
				</Snackbar>
			)}
		</NotificationContext.Provider>
	)
}
export default NotificationContext
