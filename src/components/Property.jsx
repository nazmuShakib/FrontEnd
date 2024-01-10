import { useState } from 'react'
import {
	Box,
	Divider,
} from '@mui/material'
import PropertyHeader from './Utility/PropertyHeader'
import ImagesAndDescription from './Utility/ImagesAndDescription'
import PlaceInfo from './Utility/PlaceInfo'
import RulesAndPreferences from './Utility/RuleAndPreferences'
import Map from './Utility/Map'
import PriceAndAdvertiser from './Utility/PriceAndAdvertiser'
import ContactAndAddress from './Utility/ContactAndAddress'
import Rating from './Utility/Rating'

export default function Property() {
	const auth = true
	const [rating, setRating] = useState(0)
	const getRating = (newRating) => {
		setRating(newRating)
	}
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
			<ImagesAndDescription />
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
