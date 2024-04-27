import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

const Profile = memo(() => {
	console.log('profile')
	const { userID } = useParams()
	console.log(userID)
	return (
		<Box>Profile</Box>
	)
})
export default Profile
