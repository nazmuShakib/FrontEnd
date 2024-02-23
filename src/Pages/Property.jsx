import {
	useState,
	useCallback,
} from 'react'
import { useLocation } from 'react-router-dom'
import {
	Box,
	Divider,
} from '@mui/material'
import PropertyHeader from '../components/ShowProperty/PropertyHeader'
import BasicInfo from '../components/ShowProperty/BasicInfo'
import ImageSlider from '../components/ShowProperty/ImageSlider'
import PlaceDescription from '../components/ShowProperty/PlaceDescription'
import PlaceInfo from '../components/ShowProperty/PlaceInfo'
import RulesAndPreferences from '../components/ShowProperty/RuleAndPreferences'
import RequiredDocuments from '../components/ShowProperty/RequiredDocuments'
import Map from '../components/ShowProperty/Map'
import PriceAndAdvertiser from '../components/ShowProperty/PriceAndAdvertiser'
import ContactAndAddress from '../components/ShowProperty/ContactAndAddress'
import Rating from '../components/ShowProperty/Rating'

export default function Property() {
	const location = useLocation()
	const { from } = location.state
	const auth = true
	const initialRating = localStorage.getItem('rating') || 0
	const [rating, setRating] = useState(parseInt(initialRating, 10))

	const getRating = useCallback((newRating) => {
		const v = newRating == null ? 0 : newRating
		setRating(v)
		localStorage.setItem('rating', v.toString())
	}, [setRating])
	console.log('property')
	const res = from
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
			<PropertyHeader title={res?.title} />
			<Divider variant="middle" />
			<BasicInfo availableDate={res?.availableDate} gender={res?.gender} category={res?.category} />
			<ImageSlider url={res?.imageUrls} />
			<PlaceDescription description={res?.description} />
			<RulesAndPreferences rulesAndPreferences={res?.rulesAndPreference} />
			<RequiredDocuments requiredDocuments={res?.requiredDocuments} />
			<PlaceInfo placeInfo={res?.placeInfo} />
			{auth && <ContactAndAddress address={res?.address} />}
			<Map mapCoordinate={res?.mapCoordinate} />
			<PriceAndAdvertiser price={res?.price} />
			<Rating getRating={getRating} />
			{/* TODO add similar property lists and rating section */}
		</Box>
	)
}
