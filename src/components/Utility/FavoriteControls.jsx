import { memo, useState } from 'react'
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@mui/material'
import {
	Delete,
} from '@mui/icons-material'
import { useMutation } from 'react-query'
import useAxiosPrivate from '../../Hooks/useAxiosPrivate'
import useNotification from '../../Hooks/useNotification'

const FavoriteControls = memo(({ property, refetch }) => {
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
	const { openNotification } = useNotification()
	const deleteFavorite = () => axiosPrivate({
		method: 'DELETE',
		url: `/favorites/remove/${property?.ID}`,
	})
	const { mutateAsync: removeFavorite, isLoading } = useMutation(deleteFavorite)
	if (isLoading) return <CircularProgress />
	const handleDelete = async (event) => {
		event.preventDefault()
		try {
			await removeFavorite()
			setDeleteDialog(false)
			openNotification('Successfully deleted from favorites', 'success')
			refetch()
		} catch (err) {
			console.log(err)
			openNotification('Failed to delete from favorites', 'error')
		}
	}
	return (
		<>
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

export default FavoriteControls
