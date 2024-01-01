import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
// import MenuItem from '@material-ui/core/MenuItem'
import { IconButton, Box } from '@mui/material'
import { MenuOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function MenuBar() {
	const [anchorEl, setAnchorEl] = React.useState(null)
	let open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
		open = Boolean(anchorEl)
	}
	const handleClose = () => {
		setAnchorEl(null)
		open = Boolean(anchorEl)
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
				<MenuItem component={Link} to="/">Home</MenuItem>
				<MenuItem component={Link} to="/my-favorites">My Favorties</MenuItem>
				<MenuItem component={Link} to="/my-properties">My Properties</MenuItem>
				<MenuItem component={Link} to="/login">Login</MenuItem>
			</Menu>
		</Box>
	)
}
