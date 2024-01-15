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

import usePlacesAutocomplete, {
	getLatLng,
	getGeocode,
} from 'use-places-autocomplete'

import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from '@reach/combobox'

import '@reach/combobox/styles.css'
import '../../styles/map.css'

const center = {
	lat: 23.8041,
	lng: 90.4152,
}

const lib = ['places']
const GetLocation = memo(({ getLocation }) => {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
		libraries: lib,
	})
	const [location, setLocation] = useState(null)
	const [selected, setSelected] = useState(null)
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
			component="div"
			marginTop="10px"
		>
			{
				isLoaded ? (
					<Box component="div">
						<PlacesAutocomplete setSelected={setSelected} />
						<GoogleMap
							center={selected || center}
							zoom={13}
							onClick={handleClick}
							mapContainerStyle={{
								width: '100%',
								height: '400px',
							}}
						>
							{selected && <MarkerF position={location} />}
							<MarkerF
								position={location}
							/>
						</GoogleMap>
					</Box>
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

function PlacesAutocomplete({ setSelected }) {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete()
	const handleChange = (event) => {
		setValue(event.target.value)
	}
	const handleSelect = async (address) => {
		setValue(address, false)
		clearSuggestions()
		const results = await getGeocode({ address })
		const { lat, lng } = getLatLng(results[0])
		setSelected({ lat, lng })
	}
	return (
		<Combobox onSelect={handleSelect} openOnFocus>
			<ComboboxInput
				value={value}
				onChange={handleChange}
				disabled={!ready}
				placeholder="Search a Location"
			/>
			<ComboboxPopover>
				<ComboboxList>
					{status === 'OK'
						&& data.map(({ placeId, description }) => (
							<ComboboxOption key={placeId || description} value={description} />
						))}
				</ComboboxList>
			</ComboboxPopover>

		</Combobox>
	)
}
export default GetLocation
