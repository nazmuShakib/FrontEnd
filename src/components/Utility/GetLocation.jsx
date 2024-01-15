import {
	useCallback,
	useMemo,
	memo,
	useState,
} from 'react'

import {
	Box,
	CircularProgress,
} from '@mui/material'

import {
	GoogleMap,
	useJsApiLoader,
	MarkerF,
} from '@react-google-maps/api'

const center = {
	lat: 23.8041,
	lng: 90.4152,
}

const GetLocation = memo(({ getLocation }) => {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
	})
	const [location, setLocation] = useState(null)
	const handleClick = useCallback((event) => {
		const newLocation = {
			lat: event.latLng.lat(),
			lng: event.latLng.lng(),
		}
		setLocation(newLocation)
		getLocation(newLocation)
	}, [getLocation])

	return (
		<Box
			marginTop="10px"
		>
			{
				isLoaded ? (
					<GoogleMap
						center={center}
						zoom={13}
						onClick={handleClick}
						mapContainerStyle={{
							width: '100%',
							height: '400px',
						}}
					>
						<MarkerF
							position={location}
						/>
					</GoogleMap>
				) : (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						height="400px"
					>
						<CircularProgress />
					</Box>
				)
			}
		</Box>
	)
})

export default GetLocation
