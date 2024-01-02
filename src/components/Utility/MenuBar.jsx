import { useState } from 'react'
import { NavLink } from 'react-router-dom'
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
				/* change background color on Hover if not active */
				sx={{
					'& .MuiMenuItem-root:not(.nohover):hover': {
						backgroundColor: '#cfd5e5',
					},
					'& .MuiMenuItem-root.active:not(.nohover)': {
						backgroundColor: '#54689c',
						color: 'white',
					},
				}}
			>
				<MenuItem
					component={NavLink}
					to="/"
					name="Home Item"
					onClick={handleClose}
				>
					Home

				</MenuItem>
				<MenuItem
					component={NavLink}
					to="/my-favorites"
					name="My Favorites Item"
					onClick={handleClose}
				>
					My Favorties

				</MenuItem>
				<MenuItem
					component={NavLink}
					to="/my-properties"
					name="My Properties Item"
					onClick={handleClose}
				>
					My Properties

				</MenuItem>
				<MenuItem
					component={NavLink}
					to="/login"
					name="Login Item"
					onClick={handleClose}
				>
					Login

				</MenuItem>
			</Menu>
		</Box>
	)
}
