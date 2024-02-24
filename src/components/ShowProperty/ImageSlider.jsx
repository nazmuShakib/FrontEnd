import {
	memo, useState, useEffect, useRef,
} from 'react'
import {
	Box,
	Button,
} from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '../../styles/carousel.css'
import {
	ArrowBackRounded,
	ArrowForwardRounded,
} from '@mui/icons-material'

const useImageLoaded = () => {
	const [loaded, setLoaded] = useState(false)
	const ref = useRef()

	const onLoad = () => {
		setLoaded(true)
	}

	useEffect(() => {
		if (ref.current && ref.current.complete) {
			onLoad()
		}
	})

	return [ref, loaded, onLoad]
}

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
	const [ref, loaded, onLoad] = useImageLoaded()
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
						ref={ref}
						className="image-placeholder"
						style={{
							opacity: `${loaded ? 1 : 0}`,
							transition: 'opacity 200ms ease-in-out',
						}}
						key={img}
						src={loaded ? img.original : img.placeHolder}
						alt={img}
						loading="lazy"
						onLoad={onLoad}
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
