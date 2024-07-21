import { Navigate, useLocation } from 'react-router-dom'
import {
	Box,
	Divider,
} from '@mui/material'
import PropertyInfoAndFavorite from '../components/ShowProperty/PropertyInfoAndFavorite'
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
import BookPropertyButton from '../components/ShowProperty/BookPropertyButton'
import useAuth from '../Hooks/useAuth'

export default function Property() {
	const location = useLocation()
	const from = location?.state?.from
	const myProperty = location?.state?.myProperty
	const { auth } = useAuth()
	console.log('property')
	const res = from
	if (!from) {
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
			{auth && <PropertyInfoAndFavorite propertyID={res?.ID} />}
			<PropertyHeader title={res?.title} />
			<Divider variant="middle" />
			<BasicInfo availableDate={res?.availableDate} gender={res?.gender} category={res?.category} />
			<ImageSlider url={res?.imageUrls} />
			<PlaceDescription description={res?.description} />
			<RulesAndPreferences rulesAndPreference={res?.rulesAndPreference} />
			<RequiredDocuments requiredDocuments={res?.requiredDocuments} />
			<PlaceInfo placeInfo={res?.placeInfo} />
			{auth && <ContactAndAddress address={res?.address} contact={res?.contact} optionalContact={res?.optional_contact} />}
			<Map mapCoordinate={mapCoordinate} />
			<PriceAndAdvertiser price={res?.price} userID={res?.userID} />
			{!myProperty && <BookPropertyButton propertyID={res?.ID} propertyOwner={res?.userID} />}
			<RatingAndReview propertyID={res?.ID} myProperty={myProperty} />
			{/* TODO add similar property lists and rating section */}
		</Box>
	)
}
