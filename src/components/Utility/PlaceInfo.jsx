import { memo } from 'react'
import {
	Card,
	CardContent,
	Divider,
	Typography,
	Grid,
	Box,
} from '@mui/material'
import { PlaceOutlined } from '@mui/icons-material'
import Place from './Place'

const PlaceInfo = memo(({ placeInfo }) => (
	<Box sx={{
		marginTop: '10px',
		width: '100%',
		boxShadow: 1,

	}}
	>
		<Card>
			<Typography component="h1" variant="h6" textAlign="center">Place Info</Typography>
			<Divider variant="middle"><PlaceOutlined /></Divider>
			<CardContent title="Place Info">
				<Grid container spacing={2} justifyContent="center">
					<Place placeType="Division" placeName={placeInfo?.division} />
					<Place placeType="District" placeName={placeInfo?.district} />
					<Divider />
					<Place placeType="Upazilla" placeName={placeInfo?.thana} />
					{/* <Place placeType="Area" placeName="Rangpur" /> */}
				</Grid>
			</CardContent>
		</Card>
	</Box>
))

export default PlaceInfo
