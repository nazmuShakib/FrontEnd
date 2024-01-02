import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { IconButton, Box } from '@mui/material'
import { MenuOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function MenuBar() {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
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
				<MenuOutlined />
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem component={Link} to="/" onClick={handleClose}>Home</MenuItem>
				<MenuItem component={Link} to="/my-favorites" onClick={handleClose}>My Favorties</MenuItem>
				<MenuItem component={Link} to="/my-properties" onClick={handleClose}>My Properties</MenuItem>
				<MenuItem component={Link} to="/login" onClick={handleClose}>Login</MenuItem>
			</Menu>
		</Box>
	)
}
