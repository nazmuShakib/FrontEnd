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
			margin: '5%',
			'@media (min-width: 430px)': {
				paddingTop: '4%',
			},
			'@media (min-width: 768px)': {
				fontSize: '30px',
				paddingTop: '3%',
			},
			'@media (min-width: 968px)': {
				paddingTop: '2%',
			},
		}}
	>
		{/* Property Header of a house with property information and other descriptions of the flat. 2 Bedroom, 2 Bathroom etc */}
		{title}
	</Box>
))

export default PropertyHeader
