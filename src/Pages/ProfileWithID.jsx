import { memo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import {
	Box, Typography,
	Avatar, CircularProgress,
} from '@mui/material'
import { AttachFileOutlined, SendOutlined } from '@mui/icons-material'
import '../styles/profile.css'
import axios from '../api/axios'

function stringToColor(string) {
	let hash = 0
	let i

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash)
	}

	let color = '#'
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff
		color += `00${value.toString(16)}`.slice(-2)
	}
	/* eslint-enable no-bitwise */

	return color
}

function stringAvatar(name) {
	return {
		sx: {
			bgcolor: stringToColor(name),
			width: '3em',
			height: '3em',
			fontSize: '48px',
			objectFit: 'scale-down',
		},
		children: `${`${name[0]}`.toUpperCase()}`,
	}
}
const ProfileWithID = memo(() => {
	console.log('profile with id')
	const { userID } = useParams()
	const getUserInfo = () => axios({
		url: `/profile/public/get-info/${userID}`,
		method: 'GET',
	})
	const { data, isLoading } = useQuery(['get-user-info', 'public', userID], getUserInfo)
	const [img, setImg] = useState('')
	if (isLoading) return <CircularProgress />
	const userInfo = data?.data?.data
	const handleChange = (event) => {
		console.log(event.target.files)
		setImg(event.target.value)
	}
	const whichIcon = () => {
		if (img) return <SendOutlined />
		return <AttachFileOutlined />
	}
	return (
		<Box
			component="div"
			sx={{
				height: '100%',
				width: '100%',
				marginTop: '20px',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<Box
				component="div"
				className="profile-container"
			>
				<Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					{/* eslint-disable-next-line react/jsx-props-no-spreading */}
					<Avatar {...stringAvatar(userInfo?.username || '')} src="" />
					{/* <Button
						variant="contained"
						component="label"
						className="upload-button upload"
						onChange={handleChange}
						endIcon={whichIcon()}
					>
						UPLOAD
						<input accept="image/*" hidden type="file" />
					</Button> */}
				</Box>
				<Box component="div" sx={{ width: '100%' }}>
					<UserName userID={userID} userInfo={userInfo} />
					<Box component="div" className="profile-info">
						<Typography variant="body1" component="span" sx={{ fontWeight: '500', marginRight: '10px' }}>Email:</Typography>
						<Typography variant="body1" component="span">{userInfo?.email}</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	)
})
const UserName = memo(({ userInfo }) => {
	console.log('username')
	return (
		<Box component="div" className="user-name">
			<Box component="div" className="profile-info" sx={{ width: '90%', marginRight: '10px' }}>
				<Typography variant="body1" component="span" sx={{ fontWeight: '500', marginRight: '10px' }}>UserName:</Typography>
				<Typography variant="body1" component="span">{userInfo?.username}</Typography>
			</Box>
		</Box>
	)
})
export default ProfileWithID
