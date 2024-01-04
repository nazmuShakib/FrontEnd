import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

export default function MyFavorites() {
	return (
		<Button
			variant="text"
			component={NavLink}
			type="button"
			name="My Favorites"
			to="/my-favorites"
			sx={{
				width: '120px',
				display: 'none',
				'@media (min-width: 768px)': {
					display: 'flex',
				},
				':not(.nohover):hover': {
					backgroundColor: '#cfd5e5',
				},
				'&.active:not(.nohover)': {
					backgroundColor: '#54689c',
					color: 'white',
				},
			}}
		>
			My Favorites
		</Button>
	)
}
