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
			'@media (min-width: 600px)': {
				display: 'flex',
				justifyContent: 'space-around',
			},
		}}
	>
		<Box
			component="div"
			marginBottom="10px"
			sx={{
				'@media (min-width: 600px)': {
					marginBottom: '0px',
				},
			}}
		>
			<Typography variant="span" component="section" color="gray" textAlign="center">Available From</Typography>
			<Typography variant="span" component="section" textAlign="center">12 December, 2020</Typography>
		</Box>
		<Box
			component="div"
			sx={{
				marginBottom: '10px',
				'@media (min-width: 600px)': {
					marginBottom: '0px',
				},
			}}
		>
			<Typography
				variant="span"
				component="section"
				color="gray"
				textAlign="center"

			>
				Category
			</Typography>
			<Typography variant="span" component="section" textAlign="center">Sublet</Typography>
		</Box>
		<Box>
			<Typography variant="span" component="section" color="gray" textAlign="center">Gender</Typography>
			<Typography variant="span" component="section" textAlign="center">Male</Typography>
		</Box>
	</Box>
))

export default BasicInfo
