import {
	Box,
	Grid,
	Typography,
} from '@mui/material'

export default function Place({ placeType, placeName }) {
	return (
		<Grid
			item
			xs={12}
			sm={6}
			md={3}
		>
			<Box textAlign="center">
				<Typography
					variant="subtitle2"
					color="gray"
				>
					{placeType}
				</Typography>
				<Typography
					variant="body1"
				>
					{placeName}
				</Typography>
			</Box>
		</Grid>
	)
}
