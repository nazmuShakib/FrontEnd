import {
	memo,
} from 'react'
import {
	Box, Typography,
} from '@mui/material'

const BasicInfo = memo(() => (
	<Box
		display="block"
		marginTop="20px"
		marginBottom="10px"
		sx={{
			'@media (min-width: 900px)': {
				display: 'flex',
				justifyContent: 'space-around',
			},
		}}
	>
		<Box
			marginBottom="10px"
			sx={{
				'@media (min-width: 900px)': {
					marginBottom: '0px',
				},
			}}
		>
			<Typography variant="span" component="section" color="gray" textAlign="center">Available From</Typography>
			<Typography variant="span" component="section" textAlign="center">12 December, 2020</Typography>
		</Box>
		<Box>
			<Typography variant="span" component="section" color="gray" textAlign="center">Category</Typography>
			<Typography variant="span" component="section" textAlign="center">Male</Typography>
		</Box>
	</Box>
))

export default BasicInfo
