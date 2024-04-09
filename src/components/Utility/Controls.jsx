import { memo, useState } from 'react'
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Popover,
	Modal,
} from '@mui/material'
import {
	Edit,
	Delete,
} from '@mui/icons-material'
import { useMutation } from 'react-query'
import useAxiosPrivate from '../../Hooks/useAxiosPrivate'

const Controls = memo(({ propertyID, refetch }) => {
	console.log(propertyID)
	const [deleteDialog, setDeleteDialog] = useState(false)
	const [deleteAnchorEl, setDeleteAnchorEl] = useState(null)
	const closeDeleteDialog = (event) => {
		event.preventDefault()
		setDeleteAnchorEl(event.currentTarget)
		setDeleteDialog(false)
	}
	const openDeleteDialog = (event) => {
		event.preventDefault()
		setDeleteDialog(true)
	}
	const axiosPrivate = useAxiosPrivate()
	const deleteProperty = () => axiosPrivate({
		method: 'DELETE',
		url: `/myProperty/removeProperty/${propertyID}`,
	})
	const { mutateAsync: removeProperty, isLoading } = useMutation(['delete-property'], deleteProperty)
	if (isLoading) return <CircularProgress />
	const handleDelete = async (event) => {
		event.preventDefault()
		try {
			await removeProperty()
			setDeleteDialog(false)
			refetch()
		} catch (err) {
			console.log(err)
		}
	}
	const handleEdit = (event) => {
		event.preventDefault()
	}
	return (
		<>
			<Button
				variant="contained"
				type="button"
				color="warning"
				size="small"
				onClick={(event) => {
					event.preventDefault()
					alert('edit button clicked')
				}}
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

export default Controls
