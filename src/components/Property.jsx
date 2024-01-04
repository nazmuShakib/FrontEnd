import {
	Box,
	Typography,
} from '@mui/material'
import ImageSlider from './Utility/ImageSlider'

// Basic image slider
// TODO change the left and right slider arrows
// Use utility function for each section
export default function ImageGallery() {
	return (
		<Box component="div">
			<Typography variant="p" component="div">
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
			</Typography>
			<Box
				component="div"
				width="100%"
				paddingTop="23.33%"
				// 30 : 7 aspect ratio
				position="relative"
				sx={{
					display: 'block',
					'@media only screen and (min-width: 430px)': {
						width: '90%',
						paddingTop: '20.33%',
						margin: 'auto',
					},
					'@media only screen and (min-width: 768px)': {
						width: '60%',
						paddingTop: '12.0%',
						display: 'flex',
						margin: '0',
					},
					'@media only screen and (min-width: 1200px)': {
						width: '55%',
						paddingTop: '10.833%',
					},
				}}
			>
				<ImageSlider />
				<p>line</p>
			</Box>
			<p>Line</p>
		</Box>
	)
}
