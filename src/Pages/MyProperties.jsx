import { memo } from 'react'
import { useQuery } from 'react-query'
import {
	Box,
	CircularProgress,
} from '@mui/material'
import PropertyGrid from '../components/Utility/PropertyGrid'
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
			<PropertyGrid title="Mess" properties={allProperties?.mess} refetch={refetch} showControls myProperty />
			<PropertyGrid title="Hostel" properties={allProperties?.hostel} refetch={refetch} showControls myProperty />
			<PropertyGrid title="Sublet" properties={allProperties?.sublet} refetch={refetch} showControls myProperty />
		</Box>
	)
})
export default MyProperties
