import { Button } from '@mui/material'

export default function LoginButton() {
	return (
		/* TODO Add profile link when user logged in */
		<Button
			variant="contained"
			component="button"
			type="button"
			display="block"
			href="/login"
		>
			Login
		</Button>
	)
}
