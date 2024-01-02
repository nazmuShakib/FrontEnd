import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Box,
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material'
import {
	Menu as MenuIcon,
	Close as CloseIcon,
} from '@mui/icons-material'

export default function MenuBar() {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = (event) => {
		console.log(event.currentTarget)
		setAnchorEl(null)
	}

	return (
		<Box>
			<IconButton
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				focusRipple
				onClick={handleClick}
				sx={{
					mt: 2,
					color: 'black',
					display: 'flex',
					'@media (min-width: 768px)': {
						display: 'none',
					},
				}}
			>
				{open ? <CloseIcon /> : <MenuIcon />}
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				/* change background color on Hover */
				sx={{
					'& .MuiMenuItem-root:hover': {
						backgroundColor: '#cfd5e5',
					},
				}}
			>
				<MenuItem component={Link} to="/" name="Home Item" onClick={handleClose}>Home</MenuItem>
				<MenuItem component={Link} to="/my-favorites" name="My Favorites Item" onClick={handleClose}>My Favorties</MenuItem>
				<MenuItem component={Link} to="/my-properties" name="My Properties Item" onClick={handleClose}>My Properties</MenuItem>
				<MenuItem component={Link} to="/login" name="Login Item" onClick={handleClose}>Login</MenuItem>
			</Menu>
		</Box>
	)
}
