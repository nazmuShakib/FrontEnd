import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
	Box, Typography,
	Avatar, CircularProgress,
	TextField,
	Button,
} from '@mui/material'
import { AttachFileOutlined, SendOutlined } from '@mui/icons-material'
import useAxiosPrivate from '../Hooks/useAxiosPrivate'
import '../styles/profile.css'
import useAuth from '../Hooks/useAuth'

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
const Profile = memo(() => {
	console.log('profile')
	const axiosPrivate = useAxiosPrivate()
	const getUserInfo = () => axiosPrivate({
		url: '/profile/get-info',
	})
	const { auth } = useAuth()
	const { data, isLoading } = useQuery(['get-user-info', auth?.userID], getUserInfo)
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
				sx={{
					width: '50%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
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
					<UserName name={userInfo?.username} />
					<TextField disabled label="Email" value={userInfo?.email} sx={{ marginTop: '10px', width: '85%' }} />
				</Box>
				<Notifications userID={auth?.userID} />
			</Box>
		</Box>
	)
})
const Notifications = memo(({ userID }) => {
	console.log('all notifications')
	const axiosPrivate = useAxiosPrivate()
	const getNotifications = () => axiosPrivate({
		url: '/profile/notifications',
		method: 'GET',
	})
	const { data, isLoading } = useQuery(['get-notifications', userID], getNotifications)
	if (isLoading) return <CircularProgress />
	const notifications = data?.data?.data
	return (
		<Box
			component="div"
			className="notification-container"
		>
			<Typography variant="h6" component="span">Notifications</Typography>
			<Box
				component="div"
				className="notification-box"
			>
				{notifications.map((notification) => (
					<Notification
						key={Math.random()}
						time={notification.createdAt}
						propertyID={notification.propertyID}
						notification={notification.notification}
					/>
				))}
			</Box>
		</Box>
	)
})
const Notification = memo(({ time, propertyID, notification }) => {
	console.log('notification')
	const navigate = useNavigate()
	const handleClick = () => {
		navigate(`/property/${propertyID}`)
	}
	return (
		<Box
			component="div"
			className="notification"
			onClick={handleClick}
		>
			<Typography variant="caption" component="div">{new Date(time).toLocaleString()}</Typography>
			{notification}
		</Box>
	)
})
const UserName = memo(({ name }) => {
	console.log('username')
	const [editOrSave, setEditOrSave] = useState(true)
	const queryClient = useQueryClient()
	const { auth } = useAuth()
	const [userName, setUserName] = useState(name)
	const axiosPrivate = useAxiosPrivate()
	const submitUserName = (data) => axiosPrivate({
		url: '/profile/edit/name',
		method: 'PATCH',
		data,
	})
	const { mutateAsync } = useMutation(['edit-user-name', auth?.userID], submitUserName)
	const handleClick = async () => {
		if (!editOrSave) {
			const data = {
				name: userName,
			}
			await mutateAsync(data)
			queryClient.setQueryData(['get-user-info', auth?.userID], (prevData) => {
				const newData = prevData
				if (newData?.data?.data) {
					newData.data.data.username = userName
				}
				return newData
			})
		}
		setEditOrSave((prevState) => !prevState)
	}
	const handleChange = (event) => {
		setUserName(event.target.value)
	}
	return (
		<Box component="div" className="user-name">
			<TextField disabled={editOrSave} label="User Name" value={userName} onChange={handleChange} sx={{ width: '85%' }} />
			<Button variant="contained" onClick={handleClick} className="edit-save-button">{editOrSave ? 'Edit' : 'Save'}</Button>
		</Box>
	)
})
export default Profile
