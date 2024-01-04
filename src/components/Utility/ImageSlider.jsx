import {
	Box,
} from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import A from '../../assets/images/A.jpeg'
import B from '../../assets/images/B.jpeg'
import C from '../../assets/images/C.jpeg'
import D from '../../assets/images/D.jpeg'

const images = [
	A,
	B,
	C,
	D,
	A,
	B,
	C,
	D,
]

export default function ImageSlider() {
	return (
		<Box sx={{
			width: '100%',
			paddingRight: '2px',
			paddingLeft: '2px',
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
