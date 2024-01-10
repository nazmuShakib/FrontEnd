import { memo } from 'react'
import { Box } from '@mui/material'
import ImageSlider from './ImageSlider'
import PlaceDescription from './PlaceDescription'

const ImagesAndDescription = memo(() => (
	<Box
		sx={{
			display: 'block',
			'@media (min-width: 900px)': {
				display: 'flex',
			},
		}}
	>
		<ImageSlider />
		<Box
			display="none"
			sx={{
				'@media (min-width: 900px)': {
					display: 'flex',
					margin: 0.75,
				},
			}}
		/>
		<PlaceDescription />
	</Box>
))

export default ImagesAndDescription
