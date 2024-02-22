import { memo } from 'react'
import {
	Card,
	CardContent,
	Typography,
	Box,
	Divider,
} from '@mui/material'
import { DescriptionOutlined } from '@mui/icons-material'

const PlaceDescription = memo(({ description }) => {
	console.log('description')
	return (
		<Box sx={{
			margin: 'auto',
			width: '100%',
			boxShadow: 1,
		}}
		>
			<Card>
				<CardContent>
					<Typography component="h1" variant="h6" textAlign="center">What this place offers</Typography>
					<Divider><DescriptionOutlined /></Divider>
					<Typography component="section" variant="span" sx={{ whiteSpace: 'pre-wrap' }}>
						{description}
					</Typography>
				</CardContent>
			</Card>
		</Box>
	)
})
export default PlaceDescription
