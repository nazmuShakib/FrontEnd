import { memo, useState } from 'react'
import {
	Box,
	Card,
	CardContent,
	Divider,
	Rating,
	Typography,
} from '@mui/material'
import { StarBorderPurple500 } from '@mui/icons-material'

const labels = {
	0.5: 'F',
	1: 'D',
	1.5: 'C',
	2: 'C+',
	2.5: 'B-',
	3: 'B',
	3.5: 'B+',
	4: 'A-',
	4.5: 'A',
	5: 'A+',
}

const getLabelText = (value) => `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`

const HoverRating = memo(({ getRating }) => {
	const [value, setValue] = useState(0)
	const [hover, setHover] = useState(-1)
	return (
		<Card
			sx={{
				marginTop: '10px',
				boxShadow: '10px',
			}}
		>
			<Typography component="h1" variant="h6" textAlign="center">Rate the Advertisement</Typography>
			<Divider variant="middle"><StarBorderPurple500 /></Divider>
			<CardContent
				height="20px"
				sx={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: '30px',
				}}
			>
				<Rating
					name="hover-feedback"
					value={value}
					precision={0.5}
					size="large"
					getLabelText={getLabelText}
					onChange={(_event, newValue) => {
						setValue(newValue)
						getRating(newValue)
					}}
					onChangeActive={(_event, newHover) => {
						setHover(newHover)
					}}
					emptyIcon={<StarBorderPurple500 style={{ opacity: 0.55 }} fontSize="inherit" />}
				/>
				{value !== null && (
					<Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
				)}
			</CardContent>
		</Card>
	)
})
export default HoverRating
