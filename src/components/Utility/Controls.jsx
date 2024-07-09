import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Typography,
	Switch,
} from '@mui/material'
import {
	Edit,
	Delete,
} from '@mui/icons-material'
import { useMutation } from 'react-query'
import useAxiosPrivate from '../../Hooks/useAxiosPrivate'
import useNotification from '../../Hooks/useNotification'

const Controls = memo(({ property, refetch }) => {
	const [deleteDialog, setDeleteDialog] = useState(false)
	const [status, setStatus] = useState(property.active)
	const closeDeleteDialog = (event) => {
		event.preventDefault()
		setDeleteDialog(false)
	}
	const openDeleteDialog = (event) => {
		event.preventDefault()
		setDeleteDialog(true)
	}
	const axiosPrivate = useAxiosPrivate()
	const { openNotification } = useNotification()
	const navigate = useNavigate()
	const deleteProperty = () => axiosPrivate({
		method: 'DELETE',
		url: `/myProperty/removeProperty/${property?.ID}`,
	})
	const updateActiveStatus = (data) => axiosPrivate({
		method: 'PATCH',
		url: '/myProperty/update/status',
		data,
	})
	const { mutateAsync: removeProperty, isLoading } = useMutation(['delete-property'], deleteProperty)
	const { mutateAsync: updateStatus } = useMutation(['update-status'], updateActiveStatus)
	if (isLoading) return <CircularProgress />
	const handleDelete = async (event) => {
		event.preventDefault()
		try {
			await removeProperty()
			setDeleteDialog(false)
			openNotification('Successfully deleted from my properties', 'success')
			refetch()
		} catch (err) {
			console.log(err)
			openNotification('Failed to delete from my properties', 'error')
		}
	}
	const handleStatus = async (event) => {
		event.preventDefault()
		const data = {
			ID: property.ID,
			status: !status,
		}
		setStatus((prevStatus) => !prevStatus)
		try {
			await updateStatus(data)
			openNotification('Successfully updated property status', 'success')
		} catch (err) {
			console.log(err)
			openNotification('Failed to update property status', 'error')
		}
	}
	const handleEdit = (event) => {
		event.preventDefault()
		navigate('/my-properties/edit', { state: { property } })
	}
	return (
		<>
			<Button
				variant="contained"
				type="button"
				color="warning"
				size="small"
				onClick={handleEdit}
				sx={{
					left: 0,
					top: 0,
					position: 'absolute',
				}}
			>
				<Edit />
			</Button>
			<Button
				variant="contained"
				type="button"
				onClick={openDeleteDialog}
				color="error"
				size="small"
				sx={{
					right: 0,
					top: 0,
					position: 'absolute',
				}}
			>
				<Delete />
			</Button>
			<Box
				component="div"
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					margin: 0,
					padding: 0,
					height: '24px',
				}}
			>
				<Typography component="span" variant="body2">{status ? <ActiveText /> : <InactiveText />}</Typography>
				<Switch
					checked={status}
					size="medium"
					onClick={handleStatus}
					sx={{
						'.css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked': {
							color: '#18453B',
						},
						'.css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
							backgroundColor: '#2E8B57',
						},
						'.css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase': {
							color: '#7a3838',
						},
						'.css-1yjjitx-MuiSwitch-track': {
							backgroundColor: '#e58585',
						},
					}}
				/>
			</Box>
			<Dialog open={deleteDialog} onClick={(event) => event.preventDefault()} onClose={closeDeleteDialog}>
				<DialogContent>
					<DialogContentText>
						Do you want to delete this item?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={closeDeleteDialog}
						sx={{
							color: '#264a9d',
							':hover': {
								backgroundColor: '#dee3f1',
								transition: 'all 0.5s ease',
							},
						}}
					>
						No
					</Button>
					<Button
						onClick={handleDelete}
						sx={{
							color: '#264a9d',
							':hover': {
								backgroundColor: '#dee3f1',
								transition: 'all 0.5s ease',
							},
						}}
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
})

const ActiveText = memo(() => (
	<Typography component="span" variant="body2" sx={{ fontWeight: 500, color: '#09872f' }}>Active</Typography>
))
const InactiveText = memo(() => (
	<Typography component="span" variant="body2" sx={{ fontWeight: 500, color: '#ca5d5d' }}>Inactive</Typography>
))
export default Controls
