import {
	memo,
	useState,
} from 'react'
import {
	Avatar,
	Button,
	InputAdornment,
	IconButton,
	List,
	ListItem,
	TextField,
	Typography,
} from '@mui/material'
import {
	LockOutlined,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material'

const SubmitButton = memo(({ name }) => (
	<Button
		type="submit"
		fullWidth
		variant="contained"
		sx={{ mt: 3, mb: 2 }}
	>
		{name}
	</Button>
))
const Header = memo(({ title }) => (
	<>
		{/* Sign Up Icon */}
		<Avatar sx={{ m: 1, bgcolor: '#7517d4' }}>
			<LockOutlined />
		</Avatar>
		{/* Sign Up header */}
		<Typography component="h1" variant="h5">
			{title}
		</Typography>
	</>
))
const InputField = memo(({ name, label }) => (
	<TextField
		margin="normal"
		required
		fullWidth
		id={name}
		label={label}
		name={name}
		autoComplete={name}
		autoFocus
	/>
))
const Password = memo((forRegistration) => {
	const [showPassword, setShowPassword] = useState(false)
	const [passwordFocus, setPasswordFocus] = useState(false)
	const handleTogglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword)
	}
	const handlePasswordFocus = () => {
		setPasswordFocus(true && forRegistration)
	}
	const handlePasswordBlur = () => {
		setPasswordFocus(false)
	}
	return (
		<>
			<TextField
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type={showPassword ? 'text' : 'password'}
				id="password"
				autoComplete="current-password"
				onFocus={handlePasswordFocus}
				onBlur={handlePasswordBlur}
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
			{forRegistration && passwordFocus && (
				<List>
					<ListItem>
						<Typography component="section" variant="span" color="darkblue">Password must be at least 8 characters long, has at least 1 lowercase, uppercase and digit characters</Typography>
					</ListItem>
				</List>
			)}
		</>
	)
})
export {
	Header,
	InputField,
	Password,
	SubmitButton,
}
