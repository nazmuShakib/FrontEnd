import { Button } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

export default function AddPropertyButton() {
	return (
		<Button
			variant="contained"
			component={NavLink}
			type="button"
			name="add-property"
			to="/add"
			sx={{
				mr: 2,
				backgroundColor: '#f0f2f7',
				color: 'black',
				display: 'none',
				'@media (min-width: 768px)': {
					display: 'flex',
				},
				':hover': {
					backgroundColor: '#cfd5e5',
					color: 'black',
				},
			}}
			startIcon={<AddCircle />}
		>
			Add Property
		</Button>
	)
}
