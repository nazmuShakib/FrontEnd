import {
	memo,
} from 'react'
import {
	Box, Typography,
} from '@mui/material'

const BasicInfo = memo(({ availableDate, gender, category }) => {
	const date = new Date(availableDate)
	const formattedDate = new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date)

	return (
		<Box
			display="block"
			marginTop="20px"
			sx={{
				'@media (min-width: 600px)': {
					display: 'flex',
					justifyContent: 'space-evenly',
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
				<Typography variant="span" component="section" textAlign="center">{formattedDate}</Typography>
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
				<Typography variant="span" component="section" textAlign="center">{category}</Typography>
			</Box>
			<Box>
				<Typography variant="span" component="section" color="gray" textAlign="center">Gender</Typography>
				<Typography variant="span" component="section" textAlign="center">{gender}</Typography>
			</Box>
		</Box>
	)
})
export default BasicInfo
