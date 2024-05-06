import { useParams, Navigate } from 'react-router-dom'
import {
	Box,
	CircularProgress,
	Divider,
} from '@mui/material'
import { useQuery } from 'react-query'
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
import RatingAndReview from '../components/ShowProperty/RatingAndReview'
import useAuth from '../Hooks/useAuth'
import axios from '../api/axios'

export default function Property() {
	const { propertyID } = useParams()
	const getProperty = () => axios({
		url: `/property/${propertyID}`,
		method: 'GET',
	})
	const { data, isLoading } = useQuery(['get-property', propertyID], getProperty)
	const { auth } = useAuth()
	console.log('property with id')
	if (isLoading) return <CircularProgress />
	const res = data?.data?.data
	if (!res) {
		return <Navigate to="/" replace />
	}
	const mapCoordinate = {
		lat: res?.location.coordinates[1],
		lng: res?.location.coordinates[0],
	}
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
			<RulesAndPreferences rulesAndPreference={res?.rulesAndPreference} />
			<RequiredDocuments requiredDocuments={res?.requiredDocuments} />
			<PlaceInfo placeInfo={res?.placeInfo} />
			{auth && <ContactAndAddress address={res?.address} contact={res?.contact} />}
			<Map mapCoordinate={mapCoordinate} />
			<PriceAndAdvertiser price={res?.price} />
			<RatingAndReview propertyID={res?.ID} />
			{/* TODO add similar property lists and rating section */}
		</Box>
	)
}
