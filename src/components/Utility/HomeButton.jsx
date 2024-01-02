import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

const style = {
	backgroundColor: 'red',
}
export default function Home() {
	console.log('Home Button')

	return (
		<Button
			variant="text"
			component={NavLink}
			type="button"
			name="Home"
			to="/"
			sx={{
				width: '70px',
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
			Home
		</Button>
	)
}
