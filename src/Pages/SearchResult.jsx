import { memo } from 'react'
import { useLocation } from 'react-router-dom'
import {
	Box,
	Grid,
} from '@mui/material'
import LazyLoad from 'react-lazy-load'
import AdvertisementCard from '../components/Utility/HomePageCard'
import '../styles/card.css'

const SearchResult = memo(() => {
	const location = useLocation()
	const allProperties = location.state
	if (!allProperties) return <h1>404</h1>
	console.log('search result')

	return (
		<Box component="div" className="advertisement">
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
							<AdvertisementCard key={property.ID} property={property} />
						</LazyLoad>
					</Grid>
				))}
			</Grid>
		</Box>
	)
})
export default SearchResult
