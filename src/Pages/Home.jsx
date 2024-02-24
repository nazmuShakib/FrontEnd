import { memo } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import {
	Box,
	Grid,
	CircularProgress,
} from '@mui/material'
import LazyLoad from 'react-lazy-load'
import AdvertisementCard from '../components/Utility/HomePageCard'
import '../styles/card.css'

const Home = memo(() => {
	console.log('home')
	const fetchData = () => axios.get('http://localhost:3000/property')
	const {
		isLoading, data, isError, error,
	} = useQuery('allproperties', fetchData, { staleTime: 1000 * 60 * 5 })
	if (isError) return <h1>{error.message}</h1>
	if (isLoading) return <CircularProgress />
	const allProperties = data?.data.data
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
export default Home
