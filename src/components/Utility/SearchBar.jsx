import { useState } from 'react'
import {
	Backdrop,
	Box,
	Button,
	Modal,
	Fade,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { SearchOutlined } from '@mui/icons-material'

/* Modal styles */
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90%',
	'@media (min-width: 768px)': {
		width: '40em',
	},
	height: '50%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

export default function TransitionsModal() {
	const [searchQuery, setSearchQuery] = useState('')
	const [open, setOpen] = useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const handleSearch = () => {
		// Handle search logic with the searchQuery
		console.log(`Searching for: ${searchQuery}`)
	}

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value)
	}

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
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
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
											<SearchIcon />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						{/* Need to add other functionalities like division, district, area name field */}
					</Box>
				</Fade>
			</Modal>
		</Box>
	)
}
