import {
	Container,
	Box,
	Typography,
	Avatar,
	TextField,
	Button,
	Link,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

export default function Login() {
	const handleSubmit = (event) => {
		// TODO Function to handle form submission.
		// It is not completed yet
		// will comeback to this when implementing backend logic
		event.preventDefault()
		const data = new FormData(event.target)
		console.log(data)
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
				{/* Sign In Icon */}
				<Avatar sx={{ m: 1, bgcolor: '#7517d4' }}>
					<LockOutlinedIcon />
				</Avatar>
				{/* Sign In header */}
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
					{/* Password Input */}
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					{/* Submit Buttion */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					{/* Sign Up link if not signed up yet */}
					{/* TODO modify the link to sign up page */}
					<Link href="/?22" variant="body2">
						Don&apos;t have an account? Sign Up
					</Link>
				</Box>
			</Box>
		</Container>
	)
}
