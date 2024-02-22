import {
	memo,
	useContext,
} from 'react'

import {
	Box,
	CircularProgress,
} from '@mui/material'

import {
	GoogleMap,
	MarkerF,
} from '@react-google-maps/api'
import GooglePlacesContext from '../../Contexts/GooglePlacesLoader'

const center = {
	lat: 23.8041,
	lng: 90.4152,
}

const Map = memo(({ mapCoordinate }) => {
	const isLoaded = useContext(GooglePlacesContext)

	return (
		<Box
			component="div"
			marginTop="10px"
		>
			{
				isLoaded ? (
					<GoogleMap
						center={mapCoordinate || center}
						zoom={13}
						mapContainerStyle={{
							width: '100%',
							height: '400px',
						}}
					>
						<MarkerF position={mapCoordinate} />
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

export default Map
