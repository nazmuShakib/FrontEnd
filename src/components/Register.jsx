import {
	useState,
} from 'react'
import {
	Container,
	Box,
	Typography,
	Avatar,
	TextField,
	Button,
	List,
	ListItem,
	InputAdornment,
	IconButton,
} from '@mui/material'
import {
	LockOutlined,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material'

export default function Login() {
	const [showPassword, setShowPassword] = useState(false)
	const [passwordFocus, setPasswordFocus] = useState(false)
	const handleTogglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword)
	}
	const handlePasswordFocus = () => {
		setPasswordFocus(true)
	}
	const handlePasswordBlur = () => {
		setPasswordFocus(false)
	}

	const handleSubmit = (event) => {
		// TODO Function to handle form submission.
		// It is not completed yet
		// will comeback to this when implementing backend logic
		event.preventDefault()
		const data = new FormData(event.target)
		// console.log(data)
		console.log(data.get('username'))
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
				{/* Sign Up Icon */}
				<Avatar sx={{ m: 1, bgcolor: '#7517d4' }}>
					<LockOutlined />
				</Avatar>
				{/* Sign Up header */}
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					{/* UserName Input */}
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="User Name"
						name="username"
						autoComplete="username"
						autoFocus
					/>
					{/* Email Input */}
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					{/* Mobile Input */}
					<TextField
						margin="normal"
						required
						fullWidth
						id="phone"
						label="Phone Number"
						name="phone"
						autoComplete="phone"
						autoFocus
					/>
					{/* Password Input */}
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
					{passwordFocus && (
						<List>
							<ListItem>
								<Typography component="section" variant="span" color="darkblue">Password must be at least 8 characters long, has at least 1 lowercase, uppercase and digit characters</Typography>
							</ListItem>
						</List>
					)}
					{/* Register Buttion */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
				</Box>
			</Box>
		</Container>
	)
}
