import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Home() {
	console.log('Home Button')

	return (
		<Button
			variant="text"
			component={Link}
			type="button"
			name="Home"
			to="/"
			sx={{
				width: '70px',
				display: 'none',
				'@media (min-width: 768px)': {
					display: 'flex',
				},
			}}
		>
			Home
		</Button>
	)
}
