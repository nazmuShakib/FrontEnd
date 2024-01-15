import {
	memo,
	useState,
} from 'react'
import {
	Button,
	MenuItem,
	Select,
	TextField,
	TextareaAutosize,
} from '@mui/material'

const Header = memo(() => (
	<TextField
		margin="normal"
		required
		fullWidth
		placeholder="Give a title"
		name="title"
		label="Title"
		type="text"
		id="title"
	/>
))
const AvailableDate = memo(() => (
	<TextField
		margin="dense"
		required
		fullWidth
		name="date"
		type="date"
		id="date"
		label="Available Date"
		InputLabelProps={{
			shrink: true,
		}}
	/>
))
const Price = memo(() => (
	<TextField
		margin="normal"
		required
		fullWidth
		name="price"
		type="number"
		id="price"
		label="Price"
	/>
))
const Contact = memo(() => (
	<TextField
		margin="normal"
		required
		fullWidth
		name="contact"
		type="tel"
		id="contact"
		label="Contact"
	/>
))
const GenderSelection = memo(() => {
	const [gender, setGender] = useState('')
	const handleGender = (event) => {
		setGender(event.target.value)
	}
	return (
		<Select
			margin="dense"
			id="gender"
			name="gender"
			displayEmpty
			renderValue={(value) => (value !== '' ? value : 'Choose One...')}
			value={gender}
			onChange={handleGender}
			required
			placeholder="Choose One..."
			fullWidth
			sx={{
				color: `${gender !== '' ? 'black' : 'gray'}`,
			}}
		>
			<MenuItem value="male">Male</MenuItem>
			<MenuItem value="female">Female</MenuItem>
		</Select>
	)
})
const PlaceDescription = memo(() => (
	<TextareaAutosize
		id="description"
		name="description"
		label="Description"
		aria-label="description"
		minRows={5}
		maxRows={7}
		placeholder="What this place offers..."
		style={{
			width: '100%',
			padding: '8px',
			boxSizing: 'border-box',
			fontSize: '1em',
			resize: 'none',
		}}
	/>
))
const RulesAndPreference = memo(() => (
	<TextareaAutosize
		id="rules_and_preference"
		name="rules_and_preference"
		aria-label="rules_and_preference"
		minRows={5}
		maxRows={7}
		placeholder="Rules and Preference..."
		style={{
			width: '100%',
			padding: '8px',
			boxSizing: 'border-box',
			fontSize: '1em',
			resize: 'none',
		}}
	/>
))
const SubmitButton = memo(() => (
	<Button
		type="submit"
		fullWidth
		variant="outlined"
		sx={{
			mt: 3,
			mb: 2,
		}}
	>
		Add
	</Button>
))

export {
	AvailableDate,
	Contact,
	GenderSelection,
	Header,
	PlaceDescription,
	Price,
	RulesAndPreference,
	SubmitButton,
}
