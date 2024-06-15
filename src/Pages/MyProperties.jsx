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
import '../styles/card.css'

const MyProperties = memo(() => {
	console.log('my-properties')
	const axiosPrivate = useAxiosPrivate()
	const fetchData = () => axiosPrivate({
		url: 'myProperty/properties',
		method: 'GET',
	})
	const {
		isLoading, data, isError, error, refetch,
	} = useQuery(['my-properties'], fetchData, { retry: 1 })
	if (isError) return <h1>{error.response.data.message}</h1>
	if (isLoading) return <CircularProgress />
	const allProperties = data?.data?.data
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
								showControls
								myProperty
							/>
						</LazyLoad>
					</Grid>
				))}
			</Grid>
		</Box>
	)
})
export default MyProperties
