import { memo } from 'react'
import { useQuery } from 'react-query'
import {
	Box,
	Grid,
	CircularProgress,
} from '@mui/material'
import LazyLoad from 'react-lazy-load'
import AdvertisementCard from '../components/Utility/HomePageCard'
import useAxiosPrivate from '../Hooks/useAxiosPrivate'
import useAuth from '../Hooks/useAuth'
import '../styles/card.css'

const MyFavorites = memo(() => {
	console.log('favorites')
	const axiosPrivate = useAxiosPrivate()
	const { auth } = useAuth()
	const fetchData = () => axiosPrivate({
		url: '/favorites/get',
		method: 'GET',
	})
	const {
		isLoading, data, isError, error, refetch,
	} = useQuery(['my-favorites', auth?.userID], fetchData)
	if (isError) return <h1>{error.response.data.message}</h1>
	if (isLoading) return <CircularProgress />
	const allProperties = data?.data?.data || []
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
					<Grid key={property.property.ID} item className="advertise-card">
						<LazyLoad
							height={400}
							offsetVertical={200}
							threshold={0.20}
						>
							<AdvertisementCard
								key={property.property.ID}
								property={property.property}
								refetch={refetch}
							/>
						</LazyLoad>
					</Grid>
				))}
			</Grid>
		</Box>
	)
})
export default MyFavorites
