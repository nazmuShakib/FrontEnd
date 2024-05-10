import { memo } from 'react'
import { Box, IconButton } from '@mui/material'
import { useMutation } from 'react-query'
import { Favorite } from '@mui/icons-material'
import useAxiosPrivate from '../../Hooks/useAxiosPrivate'

import '../../styles/show-property.css'

const PropertyInfoAndFavorite = memo(({ propertyID }) => {
	console.log('PropertyInfoAndFavorite')
	return (
		<Box component="div" className="property-info-container">
			<Box component="div" className="property-id">
				<Box component="div" sx={{ color: 'gray' }}>Property ID</Box>
				<Box component="div" className="break-word">
					{propertyID}
				</Box>
			</Box>
			<FavoriteButton propertyID={propertyID} />
		</Box>
	)
})
const FavoriteButton = memo(({ propertyID }) => {
	console.log('favorite')
	const axiosPrivate = useAxiosPrivate()
	const data = {
		propertyID,
	}
	const submitFavorites = () => axiosPrivate({
		url: '/favorites/add',
		method: 'POST',
		data,
	})
	const { mutateAsync } = useMutation(submitFavorites)
	const handleClick = async () => {
		await mutateAsync()
		console.log('favo clicked')
	}
	return (
		<Box component="div" className="favorite-button">
			<IconButton id="icon" title="Add to Favorite" onClick={handleClick}><Favorite /></IconButton>
		</Box>
	)
})
export default PropertyInfoAndFavorite
