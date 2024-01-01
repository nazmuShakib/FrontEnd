import { Button } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

export default function AddPropertyButton() {
	return (
		<Button
			variant="contained"
			component="div"
			type="button"
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
