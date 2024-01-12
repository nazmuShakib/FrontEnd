import {
	Container,
	Box,
} from '@mui/material'
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
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					{/* UserName Input */}
					<InputField name="username" label="User Name" />
					{/* Email Input */}
					<InputField name="email" label="Email" />
					{/* Phone Number Input */}
					<InputField name="phone" label="Phone" />
					{/* Password Input. true because of doing extra work like showing pasword requirements */}
					<Password true />
					{/* Register Buttion */}
					<SubmitButton name="Sign Up" />
				</Box>
			</Box>
		</Container>
	)
}
