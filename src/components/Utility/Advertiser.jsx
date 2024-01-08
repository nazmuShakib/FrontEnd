import {
	Box,
	Card,
	CardContent,
	Typography,
	Divider,
} from '@mui/material'
import { Person2Outlined, StarBorderOutlined } from '@mui/icons-material'

export default function Advertiser() {
	const userName = 'Shakib'
	const userRating = '4.5'
	return (
		<Box
			width="100%"
			marginTop="10px"
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
					Advertised By

				</Typography>
				<Divider
					variant="middle"
				>
					<Person2Outlined />
				</Divider>
				<CardContent>
					<Typography component="section" variant="span" textAlign="center" fontSize="24px">{userName}</Typography>
					<Box display="flex" justifyContent="center" alignItems="center">
						<StarBorderOutlined style={{
							fontSize: '50px',
						}}
						/>
						<Typography
							sx={{
								fontSize: '35px',
							}}
						>
							{userRating}
						</Typography>
					</Box>
				</CardContent>
			</Card>
		</Box>
	)
}
