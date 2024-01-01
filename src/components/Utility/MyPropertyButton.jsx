import { Button } from '@mui/material'

export default function MyPropertyButton() {
	return (
		<Button
			variant="text"
			component="button"
			type="button"
			name="My Properties"
			href="/my-properties"
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
