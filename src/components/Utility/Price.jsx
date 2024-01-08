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
			component="div"
			width="100%"
			marginTop="10px"
			boxShadow="1"
			sx={{
				'@media (min-width: 600px)': {
					width: '50%',
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
					<Box><Taka /></Box>
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
