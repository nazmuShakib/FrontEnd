import { memo, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
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
	CircularProgress,
} from '@mui/material'
import { StarBorderPurple500, CloseOutlined } from '@mui/icons-material'
import useAxiosPrivate from '../../Hooks/useAxiosPrivate'
import useAuth from '../../Hooks/useAuth'
import useNotification from '../../Hooks/useNotification'
import '../../styles/rating-review.css'

const labels = {
	1: 'F',
	2: 'C',
	3: 'B',
	4: 'A',
	5: 'A+',
}
const colors = new Map([['A+', '#128201'], ['A', '#77ab59'], ['B', '#f0e918'], ['C', '#FFBF00'], ['F', '#fa0202']])

const getLabelText = (value) => `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`

const RatingAndReview = memo(({ propertyID, myProperty }) => {
	console.log('rating and review')
	const [open, setOpen] = useState(false)
	const { auth } = useAuth()
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
				{auth && (!myProperty) && <RatingReviewInput propertyID={propertyID} />}
				<br />
				<Button variant="outlined" className="show-reviews" onClick={handleOpen}>Show Ratings & Reviews</Button>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					open={open}
					onClose={handleClose}
					closeAfterTransition
					className="review-modal"
					slots={{ backdrop: Backdrop }}
					slotProps={{
						backdrop: {
							timeout: 500,
						},
					}}
				>
					<Fade in={open}>
						<Box className="review-modal-window">
							<Box
								component="div"
								className="toolbar"
							>
								<Typography
									variant="h6"
									component="h1"
									sx={{ flexGrow: 1, textAlign: 'center' }}
								>
									Ratings & Reviews
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
							<Ratings propertyID={propertyID} />
							<Reviews propertyID={propertyID} />
						</Box>
					</Fade>
				</Modal>
			</CardContent>
		</Card>
	)
})
const RatingReviewInput = memo(({ propertyID }) => {
	console.log('rating review input')
	const axiosPrivate = useAxiosPrivate()
	const { auth } = useAuth()
	const getRating = () => axiosPrivate({
		method: 'GET',
		url: `/ratings/get/${propertyID}`,
	})
	const { data, isLoading } = useQuery(['get-rating', { pID: propertyID, userID: auth?.userID }], getRating, {
		cacheTime: 15 * 60 * 1000,
	})
	if (isLoading) return <CircularProgress />
	return (
		<Box
			component="div"
			className="rating-review"
		>
			<RatingSelector propertyID={propertyID} initialRating={data?.data?.data} />
			<ReviewPlaceholder propertyID={propertyID} />
		</Box>
	)
})
const Ratings = memo(({ propertyID }) => {
	console.log('Ratings')
	const axiosPrivate = useAxiosPrivate()
	const getRatings = () => axiosPrivate({
		method: 'GET',
		url: `/reviews-ratings/get/ratings/${propertyID}`,
	})
	const {
		data, isLoading, isError, error,
	} = useQuery(['get-ratings', { pID: propertyID }], getRatings)
	if (isError) return <h1>{error.response?.data?.message}</h1>
	if (isLoading) return <CircularProgress />
	const ratings = data?.data?.data
	let total = 0
	ratings.forEach((rating) => { total += rating })
	return (
		<Box component="div" className="rating-component">
			<Typography component="span" variant="subtitle2" sx={{ display: 'flex', justifyContent: 'center' }}>
				{`Based on ${total} rating${total > 1 ? 's' : ''}`}
			</Typography>
			<RatingBar label="A+" count={(ratings[5] * 100) / Math.max(1, total)} />
			<RatingBar label="A" count={(ratings[4] * 100) / Math.max(1, total)} />
			<RatingBar label="B" count={(ratings[3] * 100) / Math.max(1, total)} />
			<RatingBar label="C" count={(ratings[2] * 100) / Math.max(1, total)} />
			<RatingBar label="F" count={(ratings[1] * 100) / Math.max(1, total)} />
		</Box>
	)
})
const RatingBar = memo(({ label, count }) => {
	console.log('rating bar')
	return (
		<Box component="div" className="rating-info">
			<Typography
				component="span"
				variant="h6"
				sx={{
					width: '30px',
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				{label}
			</Typography>
			<Box component="div" className="rating-bar">
				<Box
					component="div"
					sx={{
						width: `${count}%`,
						backgroundColor: colors.get(label),
						height: '100%',
						borderRadius: '5px',
					}}
				/>
			</Box>
			<Typography component="span" variant="body2" sx={{ fontSize: '16px', width: '40px' }}>{`${count}%`}</Typography>
		</Box>
	)
})
const Reviews = memo(({ propertyID }) => {
	const axiosPrivate = useAxiosPrivate()
	const getReviews = () => axiosPrivate({
		method: 'GET',
		url: `/reviews-ratings/get/reviews/${propertyID}`,
	})
	const {
		data, isLoading, isError, error,
	} = useQuery(['get-reviews', { pID: propertyID }], getReviews)
	if (isError) return <h1>{error.response?.data?.message}</h1>
	if (isLoading) return <CircularProgress />
	const reviews = data?.data?.data || []
	console.log(reviews)
	if (!reviews.length) {
		return (
			<Box component="div" className="review-component" sx={{ display: 'flex', justifyContent: 'center' }}>
				<Typography component="span" variant="subtitle1">No reviews</Typography>
			</Box>
		)
	}
	console.log('reviews')
	return (
		<Box component="div" className="review-component">
			{reviews.map((review) => <ReviewCard key={review.review} userID={review.userID} userName={review.name} review={review.review} postTime={review.postTime} />)}
		</Box>
	)
})
const ReviewCard = memo(({
	userID, userName, review, postTime,
}) => {
	console.log('review card')
	return (
		<Box
			component="div"
			className="review-card"
		>
			<Box component="div" className="review-user-info">
				<Box component="div" sx={{ height: '26px', marginBottom: '5px' }}>
					<Box
						component={Link}
						to={`/profile/${userID}`}
						className="review-user-link"
					>
						<Typography
							component="span"
							variant="subtitle1"
							fontSize={18}
						>
							{userName}
						</Typography>
					</Box>
				</Box>
				<Typography component="span" variant="caption" sx={{ display: 'inline-block' }}>{new Date(postTime).toLocaleDateString()}</Typography>
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
const RatingSelector = memo(({ propertyID, initialRating }) => {
	console.log('rating selector')
	const axiosPrivate = useAxiosPrivate()
	const { auth } = useAuth()
	const queryClient = useQueryClient()

	const handleSubmit = (data) => axiosPrivate({
		method: 'POST',
		url: '/ratings/post',
		data,
	})

	const ratingRef = useRef(initialRating)
	const [hover, setHover] = useState(-1)
	const { mutateAsync } = useMutation(['post-rating', { pID: propertyID, userID: auth?.userID }], handleSubmit, {
		onSuccess: () => {
			queryClient.setQueryData(['get-rating', { pID: propertyID, userID: auth?.userID }], (prevData) => {
				const newData = prevData
				if (newData?.data?.data) {
					newData.data.data = ratingRef.current
				}
				return newData
			})
		},
	})
	// if (isLoading) return <CircularProgress />
	const handleChange = async (_event, newValue) => {
		ratingRef.current = newValue
		const data = {
			propertyID,
			rating: newValue,
		}
		try {
			await mutateAsync(data)
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<Box component="div" className="rating-field">
			<Box component="div">
				<InputLabel sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
				>
					Rate the property
				</InputLabel>
				<Box component="div" sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
					<Rating
						name="hover-feedback"
						value={ratingRef.current}
						size="large"
						getLabelText={getLabelText}
						onChange={handleChange}
						onChangeActive={(_event, newHover) => {
							setHover(newHover)
						}}
						emptyIcon={<StarBorderPurple500 style={{ opacity: 0.55 }} fontSize="inherit" />}
					/>
					{ratingRef.current !== null && (
						<Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : ratingRef.current]}</Box>
					)}
				</Box>
			</Box>
		</Box>
	)
})
const ReviewPlaceholder = memo(({ propertyID }) => {
	const axiosPrivate = useAxiosPrivate()
	const { openNotification } = useNotification()
	const handleSubmit = (data) => axiosPrivate({
		method: 'POST',
		url: '/reviews/post',
		data,
	})
	const { mutateAsync } = useMutation(handleSubmit)

	console.log('review placeholder')
	const screen900 = useMediaQuery('@media (min-width: 900px)')
	const [text, setText] = useState('')
	const handleChange = (event) => {
		setText(event.target.value)
	}
	const submitReview = async () => {
		const data = {
			propertyID,
			review: text,
			postTime: new Date(),
		}
		try {
			await mutateAsync(data)
			openNotification('Sucessfully posted review', 'success')
			setText('')
		} catch (err) {
			console.log(err)
			openNotification('Failed to post review', 'error')
		}
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
export default RatingAndReview
