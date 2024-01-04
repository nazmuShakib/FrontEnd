import {
	Box,
	Divider,
} from '@mui/material'
import ImageSlider from './Utility/ImageSlider'

// Basic image slider
// TODO change the left and right slider arrows
// Use utility function for each section
export default function ImageGallery() {
	return (
		<Box component="div">
			<Box
				component="h3"
				variant="h1"
				textAlign="center"
				sx={{
					paddingTop: '1%',
					'@media (min-width: 430px)': {
						paddingTop: '8%',
					},
					'@media (min-width: 768px)': {
						paddingTop: '5%',
					},
					'@media (min-width: 968px)': {
						paddingTop: '3%',
					},
				}}
			>
				Property Header of a house with property information and other descriptions of the flat. 2 Bedroom, 2 Bathroom etc
			</Box>
			<Divider variant="middle" />
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
						paddingTop: '19.33%',
						margin: 'auto',
					},
					'@media only screen and (min-width: 600px)': {
						width: '90%',
						paddingTop: '15.33%',
					},
					'@media only screen and (min-width: 768px)': {
						width: '60%',
						paddingTop: '12.0%',
						display: 'flex',
						margin: '0',
					},
					'@media only screen and (min-width: 968px)': {
						width: '55%',
						paddingTop: '9.833%',
					},
					'@media only screen and (min-width: 1168px)': {
						width: '55%',
						paddingTop: '7.833%',
					},
					'@media only screen and (min-width: 1368px)': {
						width: '55%',
						paddingTop: '5.833%',
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
