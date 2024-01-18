import {
	memo,
	useState,
} from 'react'

import {
	Container,
	Box,
	Button,
	FormControl,
	InputAdornment,
	IconButton,
	TextField,
} from '@mui/material'

import {
	Visibility,
	VisibilityOff,
} from '@mui/icons-material'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
	Header,
} from './Utility/Authentication'

const SignUpSchema = z.object({
	username: z
		.string()
		.max(100, 'used more than 100 characters')
		.refine((name) => name.trimEnd().trimStart() !== '', 'User Name required'),
	email: z
		.string()
		.email('Invalid email address'),
	password: z
		.string()
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&])(?=.*\d)[A-Za-z!@#$%&\d]+$/, 'Password doesn\'t contain a lowercase, uppercase and special character')
		.regex(/^[A-Za-z!@#$%&\d]+$/, 'Invalid characters')
		.min(8, 'Password must be at least 8 characters'),
})
export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		getValues,
	} = useForm({ resolver: zodResolver(SignUpSchema) })
	const onSubmit = (event) => {
		// TODO Function to handle form submission.
		// It is not completed yet
		// will comeback to this when implementing backend logic
		console.log(event)
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
				<Header title="Sign Up" />
				<FormControl component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
					<UserName register={register('username')} error={errors.username} />
					<Email register={register('email')} error={errors.email} />
					<Password register={register('password')} error={errors.password} />
					<SubmitButton name="Sign Up" isSubmitting={isSubmitting} />
				</FormControl>
			</Box>
		</Container>
	)
}

const UserName = memo(({ register, error }) => {
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
			placeholder="User Name"
			label="UserName"
			type="text"
			id="username"
			onChange={onChange}
			onBlur={onBlur}
			ref={ref}
			error={Boolean(error)}
			helperText={error ? error.message : 'max 100 characters'}
		/>
	)
})

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
			required
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
