import {
	useState,
	useCallback,
	useMemo,
} from 'react'
import {
	Box,
	Divider,
} from '@mui/material'
import PropertyHeader from './Utility/PropertyHeader'
import BasicInfo from './Utility/BasicInfo'
import ImageSlider from './Utility/ImageSlider'
import PlaceDescription from './Utility/PlaceDescription'
import PlaceInfo from './Utility/PlaceInfo'
import RulesAndPreferences from './Utility/RuleAndPreferences'
import Map from './Utility/Map'
import PriceAndAdvertiser from './Utility/PriceAndAdvertiser'
import ContactAndAddress from './Utility/ContactAndAddress'
import Rating from './Utility/Rating'

export default function Property() {
	const auth = true
	const initialRating = localStorage.getItem('rating') || 0
	const [rating, setRating] = useState(parseInt(initialRating, 10))
	const [url, setUrl] = useState([])

	const getRating = useCallback((newRating) => {
		const v = newRating == null ? 0 : newRating
		setRating(v)
		localStorage.setItem('rating', v.toString())
	}, [setRating])
	useMemo(() => {
		const f = async () => {
			try {
				const res = await fetch('http://localhost:3000/get')
				const link = await res.json()
				setUrl(JSON.parse(link))
			} catch (err) {
				console.log(err)
			}
		}
		f()
	}, [])
	console.log('property')
	return (
		<Box
			component="div"
			sx={{
				marginLeft: '1%',
				marginRight: '1%',
				'@media (min-width: 600px)': {
					marginLeft: '7%',
					marginRight: '7%',
				},
				'@media (min-width: 1000px)': {
					marginLeft: '10%',
					marginRight: '10%',
				},
			}}
		>
			<PropertyHeader />
			<Divider variant="middle" />
			<BasicInfo />
			<ImageSlider url={url} />
			<PlaceDescription />
			<RulesAndPreferences />
			<PlaceInfo />
			{auth && <ContactAndAddress />}
			<Map />
			<PriceAndAdvertiser />
			<Rating getRating={getRating} />
			<Box>{rating}</Box>
			{/* TODO add similar property lists and rating section */}
		</Box>
	)
}
