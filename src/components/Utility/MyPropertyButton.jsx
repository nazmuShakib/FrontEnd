import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function MyPropertyButton() {
	console.log('My Properties Button')
	return (
		<Button
			variant="text"
			component={Link}
			type="button"
			name="My Properties"
			to="/my-properties"
			sx={{
				width: '130px',
				display: 'none',
				'@media (min-width: 768px)': {
					display: 'flex',
				},
			}}
		>
			My Properties
		</Button>
	)
}
