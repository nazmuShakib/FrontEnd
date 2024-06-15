import { memo } from 'react'
import { Box, Button } from '@mui/material'
import { useMutation } from 'react-query'
import useAxiosPrivate from '../../Hooks/useAxiosPrivate'

const BookPropertyButton = memo(({ propertyID }) => {
	console.log('book button')
	const axiosPrivate = useAxiosPrivate()
	const handleSubmit = (data) => axiosPrivate({
		url: '/payment/make',
		method: 'POST',
		data,
	})
	const { mutateAsync } = useMutation(handleSubmit)
	const handleClick = async (e) => {
		e.preventDefault()
		const data = {
			propertyID,
		}
		try {
			const res = await mutateAsync(data)
			window.location.replace(res.data.url)
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<Box sx={{
			display: 'flex',
			justifyContent: 'flex-end',
			marginTop: '10px',
			marginBottom: '10px',
		}}
		>
			<Button variant="contained" type="submit" name="BookProperty" onClick={handleClick} sx={{ fontSize: '1.2em', padding: '12px' }}>Book Now</Button>
		</Box>
	)
})

export default BookPropertyButton
