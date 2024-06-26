import { memo } from 'react'
import { useLocation } from 'react-router-dom'
import {
	Box,
} from '@mui/material'
import PropertyGrid from '../components/Utility/PropertyGrid'
import '../styles/card.css'

const SearchResult = memo(() => {
	const location = useLocation()
	const allProperties = location.state
	if (!Object.entries(allProperties).length) return <h1>404</h1>
	console.log('search result')
	return (
		<Box component="div" className="advertisement">
			<PropertyGrid title="Mess" properties={allProperties?.mess} />
			<PropertyGrid title="Hostel" properties={allProperties?.hostel} />
			<PropertyGrid title="Sublet" properties={allProperties?.sublet} />
		</Box>
	)
})
export default SearchResult
