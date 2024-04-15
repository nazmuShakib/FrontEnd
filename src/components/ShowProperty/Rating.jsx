import { memo, useState, use } from 'react'
import { Link } from 'react-router-dom'
import {
	Box,
	Button,
	Backdrop,
	Card,
	CardContent,
	Divider,
	Fade,
	IconButton,
	InputLabel,
	Modal,
	Rating,
	Typography,
	TextareaAutosize,
	useMediaQuery,
} from '@mui/material'
import { StarBorderPurple500, CloseOutlined } from '@mui/icons-material'
import '../../styles/rating-review.css'

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
	console.log('rating')
	const [review, setReview] = useState('')
	const [open, setOpen] = useState(false)
	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
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
			>
				<Box
					component="div"
					className="rating-review"
				>
					<RatingSelector getRating={getRating} />
					<ReviewPlaceholder setReview={setReview} />
				</Box>
				<br />
				<Button variant="outlined" className="show-reviews" onClick={handleOpen}>Show Reviews</Button>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					open={open}
					onClose={handleClose}
					closeAfterTransition
					className="modal"
					slots={{ backdrop: Backdrop }}
					slotProps={{
						backdrop: {
							timeout: 500,
						},
					}}
				>
					<Fade in={open}>
						<Box className="modal-window">
							<Box
								component="div"
								className="toolbar"
							>
								<Typography
									variant="h6"
									component="h1"
									sx={{ flexGrow: 1, textAlign: 'center' }}
								>
									Reviews
								</Typography>
								<IconButton
									size="small"
									id="close-button"
									aria-label="close"
									onClick={handleClose}
								>
									<CloseOutlined />
								</IconButton>
							</Box>
							<Reviews />
						</Box>
					</Fade>
				</Modal>
			</CardContent>
		</Card>
	)
})
const Reviews = memo(() => {
	console.log('reviews')
	const review = 'User asd sd sad fsdf sadf sd fsad fsdf asd s ds sd sdf sdf asdf asdf asdf asdf sad asd fasd fasd fasd asd asd fasd fsa fsdf'
	return (
		<Box component="div" sx={{ height: '500px', overflowY: 'auto' }}>
			{[...Array(10)].map((_, index) => <ReviewCard key={Math.random()} userName="Abc" review={review} />)}
		</Box>
	)
})
const ReviewCard = memo(({ userName, review }) => {
	console.log('review card')
	return (
		<Box
			component="div"
			sx={{
				margin: '8px 8px',
				padding: '10px 8px',
				boxShadow: '0 4px 8px 0 #5a626a7a, 0 6px 20px 0 #5a626a3b',
			}}
		>
			<Box component="div">
				<Box
					component={Link}
					to="/user/profile"
					sx={{
						textDecoration: 'none',
						display: 'inline-block',
						color: '#3568dd',
					}}
				>
					<Typography
						component="p"
						variant="body1"
						fontSize={18}
					>
						{userName}
					</Typography>
				</Box>
			</Box>
			<Typography
				component="section"
				variant="body2"
				fontSize={14}
			>
				{review}
			</Typography>
		</Box>
	)
})
const RatingSelector = memo(({ getRating }) => {
	console.log('rating selector')
	const [value, setValue] = useState(5)
	const [hover, setHover] = useState(-1)
	return (
		<Box component="div" className="rating-field">
			<Box component="div">
				<InputLabel>Rate the property</InputLabel>
				<Box component="div" sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
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
				</Box>
			</Box>
		</Box>
	)
})
const ReviewPlaceholder = memo(({ setReview }) => {
	console.log('review placeholder')
	const screen900 = useMediaQuery('@media (min-width: 900px)')
	const [text, setText] = useState('')
	const handleChange = (event) => {
		setText(event.target.value)
	}
	const submitReview = () => {
		console.log(text)
		setReview(text)
	}
	const isEmpty = () => text.trimStart().trimEnd() === ''
	return (
		<Box component="div">
			<InputLabel>Review the property</InputLabel>
			<Box component="div" sx={{ width: '100%' }}>
				<TextareaAutosize
					maxRows={10}
					minRows={6}
					cols={screen900 ? 50 : 40}
					value={text}
					onChange={handleChange}
					maxLength={300}
					placeholder="Write a review about this property"
					className="review-placeholder"
					style={{
						border: '1px solid black',
						fontSize: '16px',
						width: '100%',
					}}
				/>
			</Box>
			<Box component="div" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					type="button"
					variant="contained"
					disabled={isEmpty()}
					onClick={submitReview}
					className="review-placeholder-button"
				>
					Post
				</Button>
			</Box>
		</Box>
	)
})
export default HoverRating
