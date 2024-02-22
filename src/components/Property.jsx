import {
	useState,
	useCallback,
} from 'react'
import {
	Box,
	Divider,
	CircularProgress,
} from '@mui/material'
import { useQuery } from 'react-query'
import axios from 'axios'
import PropertyHeader from './Utility/PropertyHeader'
import BasicInfo from './Utility/BasicInfo'
import ImageSlider from './Utility/ImageSlider'
import PlaceDescription from './Utility/PlaceDescription'
import PlaceInfo from './Utility/PlaceInfo'
import RulesAndPreferences from './Utility/RuleAndPreferences'
import RequiredDocuments from './Utility/RequiredDocuments'
import Map from './Utility/Map'
import PriceAndAdvertiser from './Utility/PriceAndAdvertiser'
import ContactAndAddress from './Utility/ContactAndAddress'
import Rating from './Utility/Rating'

export default function Property() {
	const auth = true
	const initialRating = localStorage.getItem('rating') || 0
	const [rating, setRating] = useState(parseInt(initialRating, 10))

	const getRating = useCallback((newRating) => {
		const v = newRating == null ? 0 : newRating
		setRating(v)
		localStorage.setItem('rating', v.toString())
	}, [setRating])
	const fetchData = () => axios.get('http://localhost:3000/property')
	const {
		isLoading, data, isError, error,
	} = useQuery('property', fetchData, { staleTime: 30000 })
	if (isError) return <h1>{error.message}</h1>
	if (isLoading) return <CircularProgress />
	const res = data?.data.data[0]
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
