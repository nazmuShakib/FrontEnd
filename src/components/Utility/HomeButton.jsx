import { Button } from '@mui/material'

export default function Home() {
	return (
		<Button
			variant="text"
			component="button"
			type="button"
			name="Home"
			href="/"
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
