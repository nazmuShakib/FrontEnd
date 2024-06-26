import { memo } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import {
	Box,
	CircularProgress,
} from '@mui/material'
import PropertyGrid from '../components/Utility/PropertyGrid'

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
			<PropertyGrid title="Mess" properties={allProperties.mess} />
			<PropertyGrid title="Hostel" properties={allProperties.hostel} />
			<PropertyGrid title="Sublet" properties={allProperties.sublet} />
		</Box>
	)
})
export default Home
