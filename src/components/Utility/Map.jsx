import {
	useCallback,
	useMemo,
	useState,
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
	InfoWindow,
} from '@react-google-maps/api'
import GooglePlacesContext from '../../Contexts/GooglePlacesLoader'

const center = {
	lat: 23.8041,
	lng: 90.4152,
}

const initialMarkers = [
	{
		id: 1, lat: 23.8067208835854, lng: 90.41174102364, title: 'Marker 1',
	},
	{
		id: 2, lat: 23.809194478001, lng: 90.40714908181, title: 'Marker 2',
	},
	{
		id: 3, lat: 23.803344154833, lng: 90.405260806667, title: 'Marker 3',
	},
	{
		id: 4, lat: 23.803344154833, lng: 90.405360806667, title: 'Marker 4',
	},
]
// This is just a prototype, there will be one marker for the corresponding location
const Map = memo(() => {
	// TODO Get marker from database and show on the map
	const isLoaded = useContext(GooglePlacesContext)

	const locations = initialMarkers
	const [selectedMarker, setSelectedMarker] = useState(null)

	const handleCloseInfoWindow = useCallback(() => {
		setSelectedMarker(null)
	}, [])

	const markers = useMemo(
		() => locations.map((marker) => (
			<MarkerF
				key={marker.id}
				position={{ lat: marker.lat, lng: marker.lng }}
				title={marker.title}
				onClick={() => setSelectedMarker(marker)}
			/>
		)),
		[locations, setSelectedMarker],
	)
	return (
		<Box
			marginTop="10px"
		>
			{
				isLoaded ? (
					<GoogleMap
						center={center}
						zoom={13}
						mapContainerStyle={{
							width: '100%',
							height: '400px',
						}}
					>
						{markers}
						{selectedMarker && (
							<InfoWindow
								position={{
									lat: selectedMarker.lat,
									lng: selectedMarker.lng,
								}}
								onCloseClick={handleCloseInfoWindow}
							>
								<Box>
									<div>
										<h3>{selectedMarker.title}</h3>
										<p>Marker information goes here.</p>
									</div>
								</Box>
							</InfoWindow>
						)}
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
