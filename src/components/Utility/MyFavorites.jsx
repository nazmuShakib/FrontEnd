import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function MyFavorites() {
	console.log('My Favorites Button')
	return (
		<Button
			variant="text"
			component={Link}
			type="button"
			name="My Favorites"
			to="/my-favorites"
			sx={{
				width: '120px',
				display: 'none',
				'@media (min-width: 768px)': {
					display: 'flex',
				},
			}}
		>
			My Favorites
		</Button>
	)
}
