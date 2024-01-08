import {
	Box,
	Card,
	CardContent,
	Typography,
	Divider,
} from '@mui/material'
import Taka from '../../assets/icons/Taka'

export default function Price() {
	const price = 99999999
	return (
		<Box
			width="100%"
			marginTop="10px"
			boxShadow="1"
			sx={{
				'@media (min-width: 900px)': {
					width: '50%',
					marginTop: '0px',
					boxShadow: 0,
				},
			}}
		>
			<Card>
				<Typography
					component="h1"
					variant="h6"
					textAlign="center"
				>
					Price

				</Typography>
				<Divider
					variant="middle"
				>
					<Taka />
				</Divider>
				<CardContent sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '50px',
				}}
				>
					{price}
				</CardContent>
			</Card>
		</Box>
	)
}
