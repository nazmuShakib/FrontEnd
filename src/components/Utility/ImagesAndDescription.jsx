import { Box } from '@mui/material'
import ImageSlider from './ImageSlider'
import PlaceDescription from './PlaceDescription'

export default function ImagesAndDescription() {
	return (
		<Box
			sx={{
				display: 'block',
				'@media (min-width: 768px)': {
					display: 'flex',
				},
			}}
		>
			<ImageSlider />
			<Box
				display="none"
				sx={{
					'@media (min-width: 768px)': {
						display: 'flex',
						margin: 0.75,
					},
				}}
			/>
			<PlaceDescription />
			<Box
				display="none"
				sx={{
					'@media (min-width: 768px)': {
						display: 'flex',
						marginLeft: 1.5,
					},
				}}
			/>
		</Box>
	)
}
