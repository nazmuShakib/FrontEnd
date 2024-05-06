import { memo, useState } from 'react'

import {
	Alert,
	Button,
	Menu,
	MenuItem,
	Snackbar,
} from '@mui/material'
import { AccountCircle, ArrowDropDown } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import useAuth from '../../Hooks/useAuth'
import useAxiosPrivate from '../../Hooks/useAxiosPrivate'

const LoggedInButton = memo(() => {
	const axiosPrivate = useAxiosPrivate()
	const logoutUser = async () => axiosPrivate({
		method: 'POST',
		url: 'user/logout',
	})
	console.log('Login Button')
	const { logout } = useAuth()
	const [anchorEl, setAnchorEl] = useState(null)
	const [error, setError] = useState(null)
	const [open, setOpen] = useState(true)
	const { mutateAsync, isLoading } = useMutation(['logout'], logoutUser, { retry: false })
	const navigate = useNavigate()
	const handleSnackBarClose = () => {
		setOpen(false)
	}
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleLogout = async () => {
		try {
			await mutateAsync()
			logout()
			navigate('/')
		} catch (err) {
			setOpen(true)
			setError(err)
		}
	}
	return (
		/* TODO Add profile link when user logged in */
		<>
			<Button
				variant="contained"
				onClick={handleClick}
				startIcon={<AccountCircle sx={{ fontSize: '20px !important', color: 'black' }} />}
				endIcon={<ArrowDropDown sx={{ fontSize: '20px !important', color: 'black' }} />}
				sx={{
					backgroundColor: '#f0f2f7',
					':hover': {
						backgroundColor: '#cfd5e5',
						color: 'black',
					},
				}}
			/>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
			{error && (
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					autoHideDuration={3000}
					open={open}
					onClose={handleSnackBarClose}
				>
					<Alert severity="error" variant="filled">Failed to logout</Alert>
				</Snackbar>
			)}
		</>
	)
})
export default LoggedInButton
