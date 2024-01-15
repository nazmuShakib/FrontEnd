import {
	useState,
} from 'react'
import {
	Box,
	FormControl,
} from '@mui/material'
import ImageUploader from './Utility/ImageUploader'
import GetLocation from './Utility/GetLocation'
import {
	AvailableDate,
	Contact,
	GenderSelection,
	Header,
	PlaceDescription,
	Price,
	RulesAndPreference,
	SubmitButton,
} from './Utility/AddPropertyElements'

export default function AddProperty() {
	const [location, setLocation] = useState(null)

	const handleSubmit = (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		data.append('location', JSON.stringify(location))
		console.log(data)
	}
	return (
		<Box
			component="div"
			sx={{
				width: ['90%', '70%', '60%', '50%'],
				margin: 'auto',
			}}
		>
			<Box component="div">
				<FormControl fullWidth component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<Header />
					<AvailableDate />
					<GenderSelection />
					<PlaceDescription />
					<RulesAndPreference />
					<Price />
					<Contact />
					<ImageUploader />
					<GetLocation getLocation={setLocation} />
					<SubmitButton />
				</FormControl>
			</Box>
		</Box>
	)
}
