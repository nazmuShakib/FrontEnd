import { memo } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import LazyLoad from 'react-lazy-load'
import AdvertisementCard from './HomePageCard'
import '../../styles/card.css'

const PropertyGrid = memo(({
	title, properties, refetch = null, showControls = false, myProperty = false,
}) => {
	console.log('property grid')
	const allProperties = properties || []
	return (
		<Box component="div" className="advertisement">
			<Typography component="div" variant="body1" sx={{ fontSize: '24px', marginBottom: '10px' }}>{title}</Typography>
			<Grid
				container
				spacing={2}
				direction="row"
				justifyContent="normal"
				alignItems="center"
				className="grid"
			>
				{allProperties.map((property) => (
					<Grid key={property.ID} item className="advertise-card">
						<LazyLoad
							height={400}
							offsetVertical={200}
							threshold={0.20}
						>
							<AdvertisementCard
								key={property.ID}
								property={property}
								refetch={refetch}
								showControls={showControls}
								myProperty={myProperty}
							/>
						</LazyLoad>
					</Grid>
				))}
			</Grid>
		</Box>
	)
})
export default PropertyGrid
