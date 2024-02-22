import {
	memo,
	useState,
	useContext,
} from 'react'

import {
	Box,
	CircularProgress,
	FormControl,
	FormHelperText,
} from '@mui/material'

import { Controller } from 'react-hook-form'

import {
	GoogleMap,
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

import GooglePlacesContext from '../../Contexts/GooglePlacesLoader'

import '@reach/combobox/styles.css'
import '../../styles/map.css'

const center = {
	lat: 23.8041,
	lng: 90.4152,
}

const GetLocation = memo(({
	control, name, error,
}) => {
	const isLoaded = useContext(GooglePlacesContext)
	const [selected, setSelected] = useState(null)
	return (
		<FormControl error={Boolean(error)} margin="normal">
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					isLoaded ? (
						<Box component="div">
							<PlacesAutocomplete setSelected={setSelected} />
							<GoogleMap
								center={selected || center}
								zoom={13}
								onClick={(event) => {
									onChange(event.latLng)
									onBlur(event.latLng)
								}}
								mapContainerStyle={{
									width: '100%',
									height: '400px',
								}}
							>
								<MarkerF
									position={value}
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
				)}
			/>
			<FormHelperText>{error ? error.message : ''}</FormHelperText>
		</FormControl>
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
