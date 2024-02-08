import {
	useState,
	useCallback,
	memo,
	useMemo,
} from 'react'
import {
	Backdrop,
	Box,
	Button,
	Modal,
	Fade,
	IconButton,
	InputAdornment,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material'
import {
	Search, SearchOutlined, CloseOutlined, ClearAll,
} from '@mui/icons-material'

import '../../styles/search.css'

const TransitionsModal = memo(() => {
	const [searchQuery, setSearchQuery] = useState('')
	const [open, setOpen] = useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const [formats, setFormats] = useState(() => ['Any'])

	const handleSearch = useCallback(() => {
		// Handle search logic with the searchQuery
		console.log(`Searching for: ${searchQuery}`)
	}, [searchQuery])
	const handleClear = useCallback(() => {
		setSearchQuery('')
		setFormats(['Any'])
	}, [setFormats, setSearchQuery])
	const handleInputChange = useCallback((event) => {
		setSearchQuery(event.target.value)
	}, [setSearchQuery])

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
	}, [formats])
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
			{open && <Box component="div" className="backdrop-blur" />}
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
						<TextField
							label="Search"
							variant="outlined"
							fullWidth
							value={searchQuery}
							onChange={handleInputChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={handleSearch} edge="end">
											<Search />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<CategorySelection formats={formats} handleFormat={handleFormat} />
						<Box component="div" className="min-max-price">
							<TextField
								margin="normal"
								name="minimum_price"
								type="number"
								id="minimum_price"
								label="Minimum Price"
								className="min-max-field"
							/>
							<TextField
								margin="normal"
								name="maximum_price"
								type="number"
								id="maximum_price"
								label="Maximum Price"
								className="min-max-field"
							/>
						</Box>
						<BottomNavigation handleSearch={handleSearch} handleClear={handleClear} />
					</Box>
				</Fade>
			</Modal>
		</Box>
	)
})
const CategorySelection = memo(({ formats, handleFormat }) => (
	<Box
		component="div"
		sx={{
			marginTop: '2em',
		}}
		className="animation-container"
	>
		<ToggleButtonGroup
			value={formats}
			onChange={handleFormat}
			className="toggle-group"
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
	</Box>
))
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
