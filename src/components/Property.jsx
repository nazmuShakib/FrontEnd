import {
	Box,
	Divider,
} from '@mui/material'
import ImageSlider from './Utility/ImageSlider'
import PropertyHeader from './Utility/PropertyHeader'

// Basic image slider
// TODO change the left and right slider arrows
// Use utility function for each section
export default function ImageGallery() {
	return (
		<Box component="div">
			<PropertyHeader />
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
