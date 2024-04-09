import { Link } from 'react-router-dom'
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import Controls from './Controls'
import Taka from '../../assets/icons/taka.svg'

function AdvertisementCard({ property, refetch, showControls = false }) {
	const {
		availableDate, title, thumbnail, price, placeInfo, ID,
	} = property
	const date = new Date(availableDate)
	const formattedDate = new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date)
	const [visibleTakaLogo, setVisibleTakaLogo] = useState(false)
	return (
		<Card className="card">
			<CardActionArea
				component={Link}
				to="/property"
				state={{ from: property }}
			>
				<CardMedia
					component="img"
					className="card-image skeleton"
					image={thumbnail}
					loading="lazy"
				/>
				<CardContent className="card-content">
					{showControls && <Controls property={property} refetch={refetch} />}
					<Box
						component="div"
						display="flex"
						alignItems="center"
						justifyContent="normal"
						gap="10px"
					>
						<img
							alt="taka"
							src={Taka}
							loading="lazy"
							id="advertise-taka"
							className={`${!visibleTakaLogo ? 'skeleton-taka' : ''}`}
							onLoad={() => setVisibleTakaLogo(true)}
						/>
						<Typography variant="h6" component="h1">
							{price}
						</Typography>
					</Box>
					<Typography
						variant="subtitle2"
						component="span"
					>
						{formattedDate}
					</Typography>
					<Typography variant="body2" component="div">
						{`${placeInfo.thana}, ${placeInfo.district}`}
					</Typography>
					<Typography variant="body1" component="article" sx={{ overflowWrap: 'break-word', hyphens: 'auto' }}>
						{title}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
export default AdvertisementCard
