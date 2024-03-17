import { useContext } from 'react'
import AuthContext from '../Contexts/authProvider'

const useAuth = () => useContext(AuthContext)

export default useAuth
