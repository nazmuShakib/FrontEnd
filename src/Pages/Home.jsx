import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	CircularProgress,
} from '@mui/material'
import '../styles/card.css'
import Taka from '../assets/icons/taka.svg'

const Home = memo(() => {
	console.log('home')
	const fetchData = () => axios.get('http://localhost:3000/property')
	const {
		isLoading, data, isError, error,
	} = useQuery('allproperties', fetchData, { staleTime: 30000 })
	if (isError) return <h1>{error.message}</h1>
	if (isLoading) return <CircularProgress />
	const allProperties = data?.data.data
	return (
		<Box component="div" className="advertisement">
			<Grid container spacing={2} direction="row" justifyContent="normal" alignItems="center" className="grid">
				{allProperties.map((property) => (
					<Grid key={Number(Math.random())} item className="advertise-card">
						<Card className="card">
							<CardActionArea component={Link} to="/property" state={{ from: property }}>
								<CardMedia component="img" image={property.imageUrls[0]} loading="lazy" height="200px" />
								<CardContent className="card-content">
									<Box component="div" display="flex" alignItems="center" justifyContent="normal" gap="10px">
										<Box component="img" src={Taka} loading="lazy" id="advertise-taka" />
										<Typography variant="h6" component="h1">
											{property.price}
										</Typography>
									</Box>
									<Typography
										variant="subtitle2"
										component="span"
									>
										1 March, 2024
									</Typography>
									<Typography variant="body2" component="div">
										{`${property.placeInfo.thana}, ${property.placeInfo.district}`}
									</Typography>
									<Typography variant="body1" component="article" sx={{ overflowWrap: 'break-word', hyphens: 'auto' }}>
										{property.title}
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
