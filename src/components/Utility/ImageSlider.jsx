import { memo } from 'react'
import {
	Box,
} from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import A from '../../assets/images/A.jpeg'
import B from '../../assets/images/B.jpeg'
import C from '../../assets/images/C.jpeg'
import D from '../../assets/images/D.jpeg'
import G from '../../assets/images/G.webp'
import H from '../../assets/images/H.webp'
import I from '../../assets/images/I.webp'

const images = [
	A,
	B,
	C,
	D,
	A,
	B,
	C,
	D,
	G,
	H,
	I,
]

function CarouselSlider() {
	return (
		<Box sx={{
			width: '100%',
		}}
		>
			<Carousel
				showArrows
				emulateTouch
				infiniteLoop
				centerMode
				ariaLabel="abc"
			>
				{images.map((img, index) => (
					<img
						key={`${index * 10}`}
						src={img}
						alt="abc"
					/>
				))}
			</Carousel>
		</Box>
	)
}
const ImageSlider = memo(() => {
	console.log('image slider')
	return (
		<Box
			component="div"
			width="100%"
			paddingTop="23.33%"
			// 30 : 7 aspect ratio
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
				},
				'@media only screen and (min-width: 968px)': {
					// width: '55%',
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
			<CarouselSlider />
		</Box>
	)
})
export default ImageSlider
