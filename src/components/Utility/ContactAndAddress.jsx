import {
	Box,
	Card,
	CardContent,
	Divider,
	Typography,
} from '@mui/material'
import {
	HouseOutlined,
	ContactPhoneOutlined,
} from '@mui/icons-material'

export default function ContactAndAddress() {
	const address = 'University of Rajshahi'
	const email = 'nazfasdfasdfasdffa@gmail.com'
	const phone = '123213124'
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
						marginBottom="10%"
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
							Address

						</Typography>
						<Divider variant="middle">
							<HouseOutlined />
						</Divider>
						<Typography
							component="section"
							variant="span"
							textAlign="center"
							overflow="auto"
						>
							{address}

						</Typography>
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
							Contact

						</Typography>
						<Divider
							variant="middle"
						>
							<ContactPhoneOutlined />
						</Divider>
						<Box
							margin="10px"
							display="flex"
							flexDirection="column"
						>

							<Typography
								component="section"
								variant="span"
								textAlign="center"
								color="gray"
							>
								Email

							</Typography>
							<Typography
								component="section"
								variant="span"
								textAlign="center"
								overflow="auto"
								marginBottom="3%"
							>
								{email}

							</Typography>
							<Typography
								component="section"
								variant="span"
								textAlign="center"
								color="gray"
							>
								Phone

							</Typography>
							<Typography
								component="section"
								variant="span"
								textAlign="center"
							>
								{phone}

							</Typography>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box>
	)
}
