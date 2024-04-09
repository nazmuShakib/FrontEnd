import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@mui/material'
import {
	Edit,
	Delete,
} from '@mui/icons-material'
import { useMutation } from 'react-query'
import useAxiosPrivate from '../../Hooks/useAxiosPrivate'

const Controls = memo(({ property, refetch }) => {
	const [deleteDialog, setDeleteDialog] = useState(false)
	const closeDeleteDialog = (event) => {
		event.preventDefault()
		setDeleteDialog(false)
	}
	const openDeleteDialog = (event) => {
		event.preventDefault()
		setDeleteDialog(true)
	}
	const axiosPrivate = useAxiosPrivate()
	const navigate = useNavigate()
	const deleteProperty = () => axiosPrivate({
		method: 'DELETE',
		url: `/myProperty/removeProperty/${property?.ID}`,
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
