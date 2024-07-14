import { memo } from 'react'
import { Link } from 'react-router-dom'
import {
	Box,
	Card,
	CardContent,
	Divider,
	Typography,
} from '@mui/material'
import {
	ContactPhoneOutlined,
	StarBorderOutlined,
} from '@mui/icons-material'
import Taka from '../../assets/icons/Taka'

const PriceAndAdvertiser = memo(({ price, userID }) => {
	const userRating = '4.5'
	const userName = 'Shakib'

	return (
		<Box
			marginTop="10px"
			boxShadow="1"
		>
			<Card>
				<CardContent sx={{
					display: 'block',
					'@media (min-width: 900px)': {
						display: 'flex',
						justifyContent: 'space-around',
					},
				}}
				>
					<Box
						width="100%"
						margin="auto"
						marginBottom="5%"
						sx={{
							'@media (min-width: 900px)': {
								width: '50%',
								margin: '0px',
								marginBottom: '0%',
							},
						}}
					>
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
						<Box display="flex" justifyContent="center" alignItems="center">
							<Typography component="section" variant="span" textAlign="center" fontSize="50px">
								{price}
							</Typography>
						</Box>
					</Box>
					<Box>
						<Divider
							orientation="vertical"
						/>

					</Box>
					<Box
						width="100%"
						margin="auto"
						sx={{
							'@media (min-width: 900px)': {
								width: '50%',
								margin: '0px',
							},
						}}
					>
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
							<ContactPhoneOutlined />
						</Divider>
						{/* <Typography component="section" variant="span" textAlign="center" alignItems="center" fontSize="24px">{userName}</Typography> */}
						<Box display="flex" justifyContent="center" alignItems="center">
							<Box
								component={Link}
								to={`/profile/${userID}`}
								className="review-user-link"
							>
								<Typography
									component="span"
									variant="subtitle1"
									fontSize={24}
								>
									{userName}
								</Typography>
							</Box>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box>
	)
})

export default PriceAndAdvertiser
