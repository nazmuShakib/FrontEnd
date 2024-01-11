import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function LoginButton() {
	console.log('Login Button')
	return (
		/* TODO Add profile link when user logged in */
		<Button
			variant="contained"
			component={Link}
			type="button"
			display="block"
			to="/login"
		>
			Login
		</Button>
	)
}
