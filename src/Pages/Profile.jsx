import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
	Box, Typography,
	Avatar, CircularProgress,
	TextField,
	Button,
	FormControl,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { AttachFileOutlined, SendOutlined } from '@mui/icons-material'
import useAxiosPrivate from '../Hooks/useAxiosPrivate'
import useNotification from '../Hooks/useNotification'
import '../styles/profile.css'
import useAuth from '../Hooks/useAuth'

const userNameSchema = z.object({
	username: z
		.string()
		.max(100, 'max 100 characters')
		.refine((name) => name.trimStart().trimEnd() !== '', { message: 'required' }),
})

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
					<UserName userInfo={userInfo} />
					{/* <TextField disabled label="Email" value={userInfo?.email} sx={{ marginTop: '10px', width: '85%' }} /> */}
					<Box component="div" className="profile-info">
						<Typography variant="body1" component="span" sx={{ fontWeight: '500', marginRight: '10px' }}>Email:</Typography>
						<Typography variant="body1" component="span">{userInfo?.email}</Typography>
					</Box>
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
const UserName = memo(({ userInfo }) => {
	console.log('username')
	const [editOrSave, setEditOrSave] = useState(true)

	const handleClick = async () => {
		setEditOrSave(false)
	}

	return (
		<Box component="div" className="user-name">
			{
				!editOrSave ? <UpdateUserName setEditOrSave={setEditOrSave} userInfo={userInfo} /> : (
					<Box component="div" sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
						<Box component="div" className="profile-info" sx={{ width: '90%', marginRight: '10px' }}>
							<Typography variant="body1" component="span" sx={{ fontWeight: '500', marginRight: '10px' }}>UserName:</Typography>
							<Typography variant="body1" component="span">{userInfo?.username}</Typography>
						</Box>
						<Button variant="contained" onClick={handleClick} className="edit-save-button">Edit</Button>
					</Box>
				)
			}
		</Box>
	)
})

const UpdateUserName = memo(({ setEditOrSave, userInfo }) => {
	console.log('update user name')
	const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm({
		resolver: zodResolver(userNameSchema),
		defaultValues: {
			username: userInfo?.username,
		},
	})
	const queryClient = useQueryClient()
	const { auth } = useAuth()
	const axiosPrivate = useAxiosPrivate()
	const { openNotification } = useNotification()

	const submitUserName = (data) => axiosPrivate({
		url: '/profile/edit/name',
		method: 'PATCH',
		data,
	})
	const { mutateAsync } = useMutation(['edit-user-name', auth?.userID], submitUserName)
	const onSubmit = async (event) => {
		try {
			const { username } = event
			const data = {
				name: username,
			}
			await mutateAsync(data)
			openNotification('Successfully updated username', 'success')
			queryClient.setQueryData(['get-user-info', auth?.userID], (prevData) => {
				const newData = prevData
				if (newData?.data?.data) {
					newData.data.data.username = username
				}
				return newData
			})
		} catch (err) {
			openNotification('Failed to update username', 'error')
		}
		setEditOrSave(true)
	}
	return (
		<FormControl
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				width: '100%',
			}}
		>
			<Box
				component="div"
				className="user-name"
				sx={{
					display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '15px',
				}}
			>
				<UserNameField control={control} error={errors.username} />
				<Button type="submit" disabled={isSubmitting} variant="contained" className="edit-save-button">Save</Button>
			</Box>
		</FormControl>
	)
})
const UserNameField = memo(({ control, error }) => {
	console.log('update user name')
	return (
		<Controller
			name="username"
			control={control}
			render={({
				field: {
					onChange,
					onBlur,
					ref,
					name,
					value,
				},
			}) => (
				<TextField
					name={name}
					onBlur={onBlur}
					ref={ref}
					label="User Name"
					value={value}
					onChange={onChange}
					sx={{ width: '90%', marginRight: '10px' }}
					error={!!error}
					helperText={error ? error.message : 'max 100 characters'}
				/>
			)}
		/>
	)
})
export default Profile
