import {
	useState,
	useCallback,
	memo,
	useRef,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Autocomplete,
	Backdrop,
	Box,
	Button,
	Modal,
	Fade,
	Grid,
	IconButton,
	Slider,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	CircularProgress,
} from '@mui/material'
import {
	SearchOutlined, CloseOutlined, ClearAll,
} from '@mui/icons-material'
import { useMutation } from 'react-query'
import axios from 'axios'
import usePlacesAutocomplete, {
	getLatLng,
	getGeocode,
} from 'use-places-autocomplete'

import Taka from '../../assets/icons/Taka'

import '../../styles/search.css'
import '../../styles/map.css'

const defaultPriceRange = [0, 20202]
const TransitionsModal = memo(() => {
	const [searchLocation, setSearchLocation] = useState('')
	const [open, setOpen] = useState(false)
	const [formats, setFormats] = useState(() => ['Any'])
	const [genders, setGenders] = useState(() => ['Any'])
	const [priceRange, setPriceRange] = useState(defaultPriceRange)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const locationRef = useRef(null)
	const handlePriceRange = useCallback((event, newPriceRange) => {
		setPriceRange(newPriceRange)
	}, [setPriceRange])

	const navigate = useNavigate()
	const handleData = (data) => axios({
		method: 'POST',
		url: 'http://localhost:3000/search',
		data,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const { mutateAsync, isLoading } = useMutation(['search'], handleData)
	const handleSearch = async () => {
		console.log(searchLocation)
		setOpen(false)
		try {
			const results = await getGeocode({ address: searchLocation })
			const location = getLatLng(results[0])
			const data = {
				location, category: formats, genders, priceRange,
			}
			const res = await mutateAsync(data)
			navigate('/results', { state: res.data.data })
		} catch (err) {
			console.log(err)
		}
	}

	const handleClear = useCallback(() => {
		locationRef.current.setValue('', false)
		setFormats(['Any'])
		setPriceRange(defaultPriceRange)
	}, [setFormats])

	const handleFormat = useCallback((event, newFormats) => {
		if (newFormats.includes('Any')) {
			if (!formats.includes('Any')) {
				setFormats(['Any'])
			} else {
				const choosenFormats = (newFormats.filter((format) => format !== 'Any'))
				setFormats(choosenFormats)
			}
		} else {
			setFormats(newFormats)
		}
	}, [formats, setFormats])
	const handleGender = useCallback((event, newGenders) => {
		if (newGenders.includes('Any')) {
			if (!genders.includes('Any')) {
				setGenders(['Any'])
			} else {
				const choosenFormats = (newGenders.filter((format) => format !== 'Any'))
				setGenders(choosenFormats)
			}
		} else {
			setGenders(newGenders)
		}
	}, [genders, setGenders])

	if (isLoading) return <Box width="4em" height="1rem"><CircularProgress /></Box>
	return (
		<Box component="div">
			<Button
				type="button"
				variant="contained"
				endIcon={<SearchOutlined />}
				sx={{
					backgroundColor: '#f0f2f7',
					color: 'black',
					mr: 2,
					width: '8em',
					display: 'flex',
					':hover': {
						backgroundColor: '#cfd5e5',
						color: 'black',
					},
				}}
				onClick={handleOpen}
			>
				Search
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				className="modal"
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box className="modal-window">
						<Box
							component="div"
							className="toolbar"
						>
							<Typography
								variant="h6"
								component="h1"
								sx={{ flexGrow: 1, textAlign: 'center' }}
							>
								Filter
							</Typography>
							<IconButton
								size="small"
								id="close-button"
								aria-label="close"
								onClick={handleClose}
							>
								<CloseOutlined />
							</IconButton>
						</Box>
						<PlaceSuggestion getLocation={setSearchLocation} ref={locationRef} />
						<CategorySelection formats={formats} handleFormat={handleFormat} />
						<GenderSelection genders={genders} handleGender={handleGender} />
						<PriceSlider priceRange={priceRange} handlPriceRange={handlePriceRange} />
						<BottomNavigation handleSearch={handleSearch} handleClear={handleClear} />
					</Box>
				</Fade>
			</Modal>
		</Box>
	)
})
const PlaceSuggestion = memo(forwardRef(({ getLocation }, ref) => {
	const {
		ready,
		value,
		setValue,
		suggestions: { data },
	} = usePlacesAutocomplete()
	useImperativeHandle(ref, () => ({ setValue }))
	useEffect(() => {
		const fetchLocation = async () => {
			try {
				const address = value || 'Dhaka, Bangladesh'
				getLocation(address)
			} catch (error) {
				console.warn('Error: ', error)
			}
		}
		fetchLocation()
	}, [value, getLocation])

	return (
		<Autocomplete
			disabled={!ready}
			id="place-suggestion"
			options={data}
			value={value}
			filterOptions={(option) => option}
			getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
			isOptionEqualToValue={(option) => option.description}
			renderInput={(params) => (
				<TextField
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...params}
					placeholder="Dhaka, Bangladesh"
					label="Search"
					variant="outlined"
				/>
			)}
			onInputChange={(event, newInputValue) => {
				setValue(newInputValue)
			}}
		/>
	)
}))
const CategorySelection = memo(({ formats, handleFormat }) => (
	<Grid
		container
		direction="row"
		className="toggle-grid"
		sx={{
			overflowX: 'auto !important',
		}}
	>
		<ToggleButtonGroup
			value={formats}
			onChange={handleFormat}
		>
			<ToggleButton
				value="Any"
				aria-label="Any"
				className={`toggle-button ${formats.includes('Any') ? 'active-button' : ''}`}
			>
				Any
			</ToggleButton>
			<ToggleButton
				value="Hostel"
				aria-label="Hostel"
				className={`toggle-button ${formats.includes('Hostel') ? 'active-button' : ''}`}
			>
				Hostel
			</ToggleButton>
			<ToggleButton
				value="Mess"
				aria-label="Mess"
				className={`toggle-button ${formats.includes('Mess') ? 'active-button' : ''}`}
			>
				Mess
			</ToggleButton>
			<ToggleButton
				value="Sublet"
				aria-label="Sublet"
				className={`toggle-button ${formats.includes('Sublet') ? 'active-button' : ''}`}
			>
				Sublet
			</ToggleButton>
		</ToggleButtonGroup>
	</Grid>
))
const GenderSelection = memo(({ genders, handleGender }) => (
	<Grid
		container
		direction="row"
		className="toggle-grid"
		sx={{
			overflowX: 'auto !important',
		}}
	>
		<ToggleButtonGroup
			value={genders}
			onChange={handleGender}
		>
			<ToggleButton
				value="Any"
				aria-label="Any"
				className={`toggle-button ${genders.includes('Any') ? 'active-button' : ''}`}
			>
				Any
			</ToggleButton>
			<ToggleButton
				value="Male"
				aria-label="Male"
				className={`toggle-button ${genders.includes('Male') ? 'active-button' : ''}`}
			>
				Male
			</ToggleButton>
			<ToggleButton
				value="Female"
				aria-label="Female"
				className={`toggle-button ${genders.includes('Female') ? 'active-button' : ''}`}
			>
				Female
			</ToggleButton>

		</ToggleButtonGroup>
	</Grid>
))
const PriceSlider = memo(({ priceRange, handlPriceRange }) => {
	console.log('PriceSlider render')

	const maxPriceView = useCallback(() => `${priceRange[1]}${priceRange[1] === defaultPriceRange[1] ? '+' : ''}`, [priceRange])

	return (
		<Box component="div" className="price-slider">
			<Typography id="price-slider-label">
				Price Range
			</Typography>
			<Slider
				getAriaLabel={() => 'Price Range'}
				value={priceRange}
				valueLabelDisplay="off"
				aria-labelledby="range-slider"
				onChange={handlPriceRange}
				min={defaultPriceRange[0]}
				max={defaultPriceRange[1]}
				className="price-slider-bar"
			/>
			<Box component="div" id="show-price">
				<Box component="div" display="flex" alignItems="center">
					<Box component="div" className="price-icon">
						<Taka />
					</Box>
					<Typography className="show-price-value">{priceRange[0]}</Typography>
				</Box>
				<Box component="div" display="flex" alignItems="center">
					<Box component="div" className="price-icon">
						<Taka />
					</Box>
					<Typography className="show-price-value">{maxPriceView()}</Typography>
				</Box>
			</Box>
		</Box>
	)
})
const BottomNavigation = memo(({ handleSearch, handleClear }) => (
	<Box component="div" className="modal-button">
		<Button
			id="clear-button"
			type="button"
			variant="contained"
			endIcon={<ClearAll />}
			onClick={handleClear}
		>
			Clear
		</Button>
		<Button
			type="button"
			variant="contained"
			endIcon={<SearchOutlined />}
			onClick={handleSearch}
		>
			Search
		</Button>
	</Box>
))

export default TransitionsModal
