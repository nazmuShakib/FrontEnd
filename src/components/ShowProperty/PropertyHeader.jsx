import { memo } from 'react'
import { Box } from '@mui/material'

const PropertyHeader = memo(({ title }) => (
	<Box
		component="h3"
		variant="h1"
		textAlign="center"
		fontSize="25px"
		sx={{
			paddingTop: '1%',
			margin: '3%',
			'@media (min-width: 430px)': {
				paddingTop: '2%',
			},
			'@media (min-width: 768px)': {
				fontSize: '30px',
				paddingTop: '2%',
			},
			'@media (min-width: 968px)': {
				paddingTop: '2%',
			},
		}}
	>
		{title}
	</Box>
))

export default PropertyHeader
