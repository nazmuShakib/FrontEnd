import {
	Link as RouteLink, useNavigate, useLocation, Navigate,
} from 'react-router-dom'
import { memo, useState } from 'react'
import {
	Container,
	Box,
	Button,
	InputAdornment,
	IconButton,
	Link,
	FormControl,
	TextField,
} from '@mui/material'
import {
	Visibility,
	VisibilityOff,
} from '@mui/icons-material'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import axios from 'axios'
import {
	Header,
} from '../components/Utility/Authentication'
import useAuth from '../Hooks/useAuth'
import useNotification from '../Hooks/useNotification'

const SignInSchema = z.object({
	email: z
		.string()
		.email('Invalid email address'),
	password: z
		.string()
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&])[A-Za-z!@#$%&\d]+$/, 'Password doesn\'t contain a lowercase, uppercase and special character')
		.regex(/^[A-Za-z!@#$%&\d]+$/, 'Invalid characters')
		.min(8, 'Password must be at least 8 characters'),
})

const handleData = (data) => axios({
	method: 'POST',
	url: 'http://localhost:3000/user/login',
	data,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(SignInSchema) })
	const navigate = useNavigate()
	const { login, auth } = useAuth()
	const { openNotification } = useNotification()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/'

	const { mutateAsync, isLoading } = useMutation(['login'], handleData)
	if (auth !== null && (Object.keys(auth).length !== 0 && auth.constructor === Object)) return <Navigate to="/" />
	const onSubmit = async (data) => {
		try {
			const res = await mutateAsync(JSON.stringify(data))
			if (res.status === 200) {
				const { accessToken, userID } = res.data
				const authObj = {
					accessToken,
					userID,
				}
				login(authObj)
				openNotification('Login successful', 'success')
				setTimeout(() => {
					navigate(from, { replace: true })
				}, 2000)
			}
		} catch (err) {
			openNotification('Login failed', 'error')
		}
	}

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{/* Sign In Icon and Title */}
				<Header title="Sign In" />
				<FormControl component="form" onSubmit={handleSubmit(onSubmit)} error={Boolean(errors)} sx={{ mt: 1 }}>
					<Email register={register('email')} error={errors.email} />
					<Password register={register('password')} error={errors.password} />
					<SubmitButton name="Sign In" isSubmitting={isSubmitting || isLoading} />
				</FormControl>

				{/* Register Page link */}
			</Box>
			<Box component="div">
				<Box>
					<Link component={RouteLink} to="/register" variant="body2">
						Don&apos;t have an account? Sign Up
					</Link>
				</Box>
				<Box>
					<Link component={RouteLink} to="/password/forget" variant="body2">
						Forgot Password
					</Link>
				</Box>
			</Box>
		</Container>
	)
}

const Email = memo(({ register, error }) => {
	const {
		onChange,
		onBlur,
		name,
		ref,
	} = register
	return (
		<TextField
			margin="normal"
			name={name}
			fullWidth
			placeholder="Email"
			label="Email"
			type="text"
			id="email"
			onChange={onChange}
			onBlur={onBlur}
			ref={ref}
			error={Boolean(error)}
			helperText={error ? error.message : ''}
		/>
	)
})

const Password = memo(({ register, error }) => {
	const {
		onChange,
		onBlur,
		name,
		ref,
	} = register
	const [showPassword, setShowPassword] = useState(false)
	const handleTogglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword)
	}
	return (
		<TextField
			name={name}
			margin="normal"
			fullWidth
			label="Password"
			type={showPassword ? 'text' : 'password'}
			id="password"
			autoComplete="current-password"
			onChange={onChange}
			onBlur={onBlur}
			ref={ref}
			error={Boolean(error)}
			helperText={error ? error.message : 'Password must contain at least one uppercase, one lowercase letter and a special symbol !@#$%&'}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleTogglePasswordVisibility} edge="end">
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	)
})

const SubmitButton = memo(({ name, isSubmitting }) => (
	<Button
		type="submit"
		fullWidth
		disabled={isSubmitting}
		variant="contained"
		sx={{ mt: 3, mb: 2 }}
	>
		{name}
	</Button>
))

export { Email, Password, SubmitButton }
