import { useContext } from 'react'
import NotificationContext from '../Contexts/notificationProvider'

const useNotification = () => useContext(NotificationContext)

export default useNotification
