import { Box } from '@mui/material'
import ImageSlider from './ImageSlider'
import PlaceDescription from './PlaceDescription'

export default function ImagesAndDescription() {
	return (
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
	)
}
