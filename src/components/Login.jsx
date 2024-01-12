import { Link as RouteLink } from 'react-router-dom'
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
import {
	Header,
	InputField,
	Password,
	SubmitButton,
} from './Utility/Authentication'

export default function Login() {
	const handleSubmit = (event) => {
		// TODO Function to handle form submission.
		// It is not completed yet
		// will comeback to this when implementing backend logic
		event.preventDefault()
		const data = new FormData(event.target)
		console.log(data)
	}
	const forRegistration = false
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
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					{/* Email Input */}
					<InputField name="email" label="Email" />
					{/* Password Input */}
					<Password forRegistration />
					{/* Submit Buttion */}
					<SubmitButton name="Sign In" />
					{/* Register Page link */}
					<Link component={RouteLink} to="/register" variant="body2">
						Don&apos;t have an account? Sign Up
					</Link>
				</Box>
			</Box>
		</Container>
	)
}
