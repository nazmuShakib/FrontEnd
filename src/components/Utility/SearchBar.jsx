import {
	useState,
	useCallback,
	memo,
	useMemo,
	useEffect,
	useRef,
	forwardRef,
	useImperativeHandle,
} from 'react'
import {
	Autocomplete,
	Backdrop,
	Box,
	Button,
	Modal,
	Fade,
	Grid,
	IconButton,
	InputAdornment,
	Slider,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material'
import {
	Search, SearchOutlined, CloseOutlined, ClearAll,
} from '@mui/icons-material'
import usePlacesAutocomplete, {
	getLatLng,
	getGeocode,
} from 'use-places-autocomplete'

import Taka from '../../assets/icons/Taka'

import '../../styles/search.css'
import '../../styles/map.css'

const defaultPriceRange = [0, 20100]
const TransitionsModal = memo(() => {
	const [searchLocation, setSearchLocation] = useState(null)
	const [open, setOpen] = useState(false)
	const [formats, setFormats] = useState(() => ['Any'])
	const [priceRange, setPriceRange] = useState(defaultPriceRange)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const locationRef = useRef(null)
	const handlePriceRange = useCallback((event, newPriceRange) => {
		setPriceRange(newPriceRange)
	}, [setPriceRange])

	const handleSearch = () => {
		// Handle search logic with the searchQuery
		console.log(searchLocation)
		console.log(priceRange)
		console.log(formats)
	}

	const handleClear = useCallback(() => {
		locationRef.current.setValue('')
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
					display: 'none',
					'@media (min-width: 768px)': {
						display: 'flex',
					},
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
	const handleSelect = async () => {
		try {
			const address = value || 'Dhaka, Bangladesh'
			const results = await getGeocode({ address })
			const { lat, lng } = getLatLng(results[0])
			getLocation({ lat, lng })
		} catch (error) {
			console.error('Error: ', error)
		}
	}
	return (
		<Autocomplete
			disabled={!ready}
			id="place-suggestion"
			options={data}
			value={value}
			onSelect={handleSelect}
			filterOptions={(option) => option}
			getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
			isOptionEqualToValue={(option) => option.description}
			renderInput={(params) => (
				<TextField
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...params}
					value="abc"
					placeholder="Dhaka, Bangladesh"
					label="Search"
					variant="outlined"
				/>
			)}
			onInputChange={(event, newInputValue) => setValue(newInputValue)}
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
