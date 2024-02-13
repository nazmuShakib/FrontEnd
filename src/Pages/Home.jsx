import { memo } from 'react'
import { Link } from 'react-router-dom'
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material'
import '../styles/card.css'
import A from '../assets/images/A.jpeg'
import Taka from '../assets/icons/taka.svg'

const Home = memo(() => {
	console.log('home')
	return (
		<Box component="div" className="advertisement">
			<Grid container spacing={2} direction="row" justifyContent="normal" alignItems="center">
				{[...Array(12)].map((_, index) => ( // Rendering 12 cards for demonstration
					<Grid key={Number(Math.random())} item className="advertise-card">
						<Card>
							<CardActionArea component={Link} to="http://localhost:5173/add">
								<CardMedia component="img" image={A} />
								<CardContent>
									<Box component="div" display="flex" alignItems="center" justifyContent="normal" gap="5px">
										<Box component="img" src={Taka} id="advertise-taka" />
										<Typography variant="h6" component="h1">
											1200
										</Typography>
									</Box>
									<Typography
										variant="subtitle2"
										component="span"
									>
										1 March, 2024
									</Typography>
									<Typography variant="body2" component="div">
										Address
									</Typography>
									<Typography variant="body1" component="article">
										আমি গতিপ্রবাহে অংশগ্রহণ করে বাংলা ভাষায় সেন্টেন্স তৈরি করছি।
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	)
})
export default Home
