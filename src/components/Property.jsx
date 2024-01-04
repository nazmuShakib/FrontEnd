import {
	Box,
} from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import A from '../assets/images/A.jpeg'
import B from '../assets/images/B.jpeg'
import C from '../assets/images/C.jpeg'
import D from '../assets/images/D.jpeg'
import E from '../assets/images/E.jpeg'
import F from '../assets/images/F.jpeg'

const images = [
	A,
	B,
	C,
	D,
	// E,
	// F,
]
// Basic image slider
// TODO change the left and right slider arrows
// Use utility function for each section
export default function ImageGallery() {
	return (
		<Box component="div">
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
				<Box>
					<Carousel
						showArrows
						emulateTouch
						infiniteLoop
						centerMode
						ariaLabel="abc"
					>
						{images.map((img) => (
							<Box
								key={img}
							>
								<img src={img} alt="abc" />
							</Box>
						))}
					</Carousel>
				</Box>
				<p>line</p>
			</Box>
			<p>Line</p>
		</Box>
	)
}
