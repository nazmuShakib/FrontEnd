import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

export default function MyPropertyButton() {
	return (
		<Button
			variant="text"
			component={NavLink}
			type="button"
			name="My Properties"
			to="/my-properties"
			sx={{
				width: '130px',
				display: 'none',
				'@media (min-width: 780px)': {
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
			My Properties
		</Button>
	)
}
