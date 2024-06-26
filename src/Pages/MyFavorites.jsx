import { memo } from 'react'
import { useQuery } from 'react-query'
import {
	Box,
	Grid,
	Typography,
	CircularProgress,
} from '@mui/material'
import LazyLoad from 'react-lazy-load'
import FavoritePageCard from '../components/Utility/FavoritePageCard'
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
			<FavoriteGrid title="Mess" properties={allProperties?.mess} refetch={refetch} />
			<FavoriteGrid title="Hostel" properties={allProperties?.hostel} refetch={refetch} />
			<FavoriteGrid title="Sublet" properties={allProperties?.sublet} refetch={refetch} />
		</Box>
	)
})

const FavoriteGrid = memo(({ title, properties, refetch }) => {
	console.log('title')
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
				{properties.map((property) => (
					<Grid key={property.ID} item className="advertise-card">
						<LazyLoad
							height={400}
							offsetVertical={200}
							threshold={0.20}
						>
							<FavoritePageCard
								key={property.ID}
								property={property}
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
