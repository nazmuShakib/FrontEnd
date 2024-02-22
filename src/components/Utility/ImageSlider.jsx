import { memo } from 'react'
import {
	Box,
	Button,
	IconButton,
} from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '../../styles/carousel.css'
import {
	ArrowBackRounded,
	ArrowForwardRounded,
} from '@mui/icons-material'
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

function CarouselSlider({ url }) {
	const renderArrowPrev = (clickHandler, hasPrev, label) => hasPrev && (
		<Button type="button" onClick={clickHandler} className="control-arrow control-prev" sx={{ padding: '0.5rem' }}>
			<Box
				component="div"
				width="100%"
				sx={{
					width: '2rem',
					height: '2rem',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: '50%',
				}}
			>
				<ArrowBackRounded />
			</Box>
		</Button>
	)

	const renderArrowNext = (clickHandler, hasNext, label) => hasNext && (
		<Button type="button" onClick={clickHandler} className="control-arrow control-next">
			<Box
				component="div"
				sx={{
					width: '2rem',
					height: '2rem',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: '50%',
				}}
			>
				<ArrowForwardRounded />
			</Box>
		</Button>
	)

	return (
		<Box sx={{
		}}
		>
			<Carousel
				showArrows
				emulateTouch
				infiniteLoop
				centerMode
				ariaLabel="abc"
				renderArrowPrev={renderArrowPrev}
				renderArrowNext={renderArrowNext}
			>
				{url?.map((img) => (
					<img
						key={img}
						src={img}
						alt="abc"
					/>
				))}
			</Carousel>
		</Box>
	)
}
const ImageSlider = memo(({ url }) => {
	console.log('image slider')
	return (
		<Box
			component="div"
			width="100%"
			paddingTop="23.33%"
			// 30 : 7 aspect ratio
			sx={{
				margin: 'auto',
				'@media only screen and (min-width: 430px)': {
					width: '90%',
					paddingTop: '19.33%',
				},
				'@media only screen and (min-width: 600px)': {
					width: '90%',
					paddingTop: '15.33%',
				},
				'@media only screen and (min-width: 768px)': {
					width: '60%',
					paddingTop: '12.0%',
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
			<CarouselSlider url={url} />
		</Box>
	)
})
export default ImageSlider
