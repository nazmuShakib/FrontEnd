import { Box } from '@mui/material'

export default function PropertyHeader() {
	return (
		<Box
			component="h3"
			variant="h1"
			textAlign="center"
			sx={{
				paddingTop: '1%',
				margin: '5%',
				'@media (min-width: 430px)': {
					paddingTop: '8%',
				},
				'@media (min-width: 768px)': {
					paddingTop: '5%',
				},
				'@media (min-width: 968px)': {
					paddingTop: '3%',
				},
			}}
		>
			Property Header of a house with property information and other descriptions of the flat. 2 Bedroom, 2 Bathroom etc
		</Box>
	)
}
