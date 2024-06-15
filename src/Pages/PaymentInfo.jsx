import { memo } from 'react'
import { Box, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

const useQuery = () => new URLSearchParams(useLocation().search)
const SuccessPayment = memo(() => {
	console.log('success payment')
	const query = useQuery()
	const propertyID = query.get('propertyID')
	return (
		<Box component="div" sx={{ marginTop: '5em' }}>
			<Box
				component="div"
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Typography component="h1" variant="h1">Success!</Typography>
			</Box>
			<Box
				component="div"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '10px',
				}}
			>
				<Typography component="span" variant="h6">Property ID:</Typography>
				<Typography component="span" variant="body1">{propertyID}</Typography>
			</Box>
		</Box>
	)
})

const FailPayment = memo(() => {
	console.log('failure payment')
	const query = useQuery()
	const propertyID = query.get('propertyID')
	return (
		<Box component="div" sx={{ marginTop: '5em' }}>
			<Box
				component="div"
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Typography component="h1" variant="h1">Failed!</Typography>
			</Box>
			<Box
				component="div"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '10px',
				}}
			>
				<Typography component="span" variant="h6">Property ID:</Typography>
				<Typography component="span" variant="body1">{propertyID}</Typography>
			</Box>
		</Box>
	)
})
export { SuccessPayment, FailPayment }
