import { Button } from '@mui/material'

export default function MyFavorites() {
	return (
		<Button
			variant="text"
			component="button"
			type="button"
			name="My Favorites"
			href="/my-favorites"
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
