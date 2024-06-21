import { memo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
	Box, Typography, FormControl, Container, Snackbar, Alert,
} from '@mui/material'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Email, Password, SubmitButton } from './Login'
import useAuth from '../Hooks/useAuth'
import axios from '../api/axios'

const ForgetPasswordSchema = z.object({
	email: z
		.string()
		.email('Invalid email address'),
})
const ResetPasswordSchema = z.object({
	password: z
		.string()
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&])[A-Za-z!@#$%&\d]+$/, 'Password doesn\'t contain a lowercase, uppercase and special character')
		.regex(/^[A-Za-z!@#$%&\d]+$/, 'Invalid characters')
		.min(8, 'Password must be at least 8 characters'),
})
const handleData = (data) => axios({
	method: 'POST',
	url: '/user/password/forget',
	data,
})

const ForgetPassword = memo(() => {
	console.log('forget password')
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(ForgetPasswordSchema) })
	const { mutateAsync, isLoading } = useMutation(handleData)
	const [notification, setNotification] = useState({
		open: false,
		message: '',
		type: '',
	})
	const { auth } = useAuth()
	if (auth) return navigate('/', { replace: true })
	const handleClose = () => {
		setNotification({ ...notification, open: false })
	}
	const onSubmit = async (data) => {
		try {
			const res = await mutateAsync(data)
			setNotification({ open: true, message: res.data?.message || 'An email has been sent.', type: 'success' })
		} catch (err) {
			console.log(err)
			setNotification({ open: true, message: 'There was an error.', type: 'error' })
		}
	}
	return (
		<Box
			sx={{
				marginTop: 8,
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<Typography variant="h4">Forget Password</Typography>
			<FormControl component="form" onSubmit={handleSubmit(onSubmit)} error={Boolean(errors)} sx={{ mt: 1 }}>
				<Box component="div" sx={{ width: '20em' }}>
					<Email register={register('email')} error={errors.email} />
				</Box>
				<SubmitButton name="Submit" isSubmitting={isSubmitting || isLoading} />
			</FormControl>
			{notification.open && (
				<Snackbar open={notification.open} autoHideDuration={5000} onClose={handleClose}>
					<Alert severity={notification.type} variant="filled">{notification.message}</Alert>
				</Snackbar>
			)}
		</Box>
	)
})
const ResetPassword = memo(() => {
	console.log('reset password')
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(ResetPasswordSchema) })
	const submitData = (data) => axios({
		method: 'POST',
		url: '/user/password/reset',
		data,
	})
	const { mutateAsync, isLoading } = useMutation(submitData)
	const navigate = useNavigate()
	const { userID, token } = useParams()
	const { auth } = useAuth()
	if (auth) return navigate('/', { replace: true })
	console.log(userID)
	const onSubmit = async (data) => {
		try {
			const newData = {
				...data,
				userID,
				token,
			}
			const res = await mutateAsync(newData)
			// if (res.status === 200) {
			navigate('/password/reset/success', { replace: true })
			// }
		} catch (err) {
			console.log(err)
			navigate('/password/reset/failure', { replace: true })
		}
	}
	return (
		<Container maxWidth="xs">
			<Box
				component="div"
				sx={{
					marginTop: '10em',
					display: 'flex',
					flexDirection: 'column',
					// alignItems: 'center',
				}}
			>
				<Typography variant="h4">Reset Password</Typography>
				<FormControl component="form" onSubmit={handleSubmit(onSubmit)} error={Boolean(errors)} sx={{ mt: 1 }}>
					<Password register={register('password')} error={errors.password} />
					<SubmitButton name="Reset" isSubmitting={isSubmitting || isLoading} />
				</FormControl>
			</Box>
		</Container>
	)
})
const ResetPasswordSuccess = memo(() => {
	console.log('reset password success')
	return (
		<Box
			component="div"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				marginTop: 8,
				alignItems: 'center',
			}}
		>
			<Typography variant="h1" component="h1">Success!</Typography>
			<Typography variant="body1" component="span">Successfully reset password. Go to login page.</Typography>
		</Box>
	)
})
const ResetPasswordFailure = memo(() => {
	console.log('reset password failure')
	return (
		<Box
			component="div"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				marginTop: 8,
				alignItems: 'center',
			}}
		>
			<Typography variant="h1" component="h1">Failure!</Typography>
			<Typography variant="body1" component="span">Failed to reset password. Try again.</Typography>
		</Box>
	)
})

export {
	ForgetPassword, ResetPassword, ResetPasswordSuccess, ResetPasswordFailure,
}
