import {
	memo,
	useState,
} from 'react'
import {
	Button,
	InputLabel,
	FormControl,
	FormHelperText,
	MenuItem,
	Select,
	TextField,
	TextareaAutosize,
} from '@mui/material'

import '../../styles/forms.css'

const Header = memo(({ register, error }) => {
	const {
		onChange,
		onBlur,
		name,
		ref,
	} = register
	console.log('header')
	return (
		<TextField
			margin="normal"
			name={name}
			fullWidth
			placeholder="Give a title"
			label="Title"
			type="text"
			id="title"
			onChange={onChange}
			onBlur={onBlur}
			ref={ref}
			error={Boolean(error)}
			helperText={error ? error.message : ''}
		/>
	)
})
const Price = memo(({ register, error }) => {
	console.log('price')
	const {
		onChange,
		onBlur,
		name,
		ref,
	} = register
	return (
		<TextField
			margin="normal"
			name={name}
			fullWidth
			type="number"
			id="price"
			label="Price"
			onChange={onChange}
			onBlur={onBlur}
			ref={ref}
			error={Boolean(error)}
			helperText={error ? error.message : ''}
		/>
	)
})
const Contact = memo(({ register, error }) => {
	console.log('contact')

	const {
		onChange,
		onBlur,
		name,
		ref,
	} = register
	return (
		<TextField
			margin="normal"
			name={name}
			fullWidth
			type="tel"
			id="contact"
			label="Contact"
			onChange={onChange}
			onBlur={onBlur}
			ref={ref}
			error={Boolean(error)}
			helperText={error ? error.message : ''}
		/>
	)
})
const GenderSelection = memo(({ register, error }) => {
	console.log('gender')
	const [gender, setGender] = useState('')
	const {
		onChange,
		onBlur,
		name,
		ref,
	} = register
	const handleGender = (event) => {
		onChange(event)
		setGender(event.target.value)
	}
	return (
		<FormControl
			error={Boolean(error)}
			margin="normal"
		>
			<InputLabel id="gender-select">Gender</InputLabel>
			<Select
				labelId="gender-select"
				id="gender"
				displayEmpty
				name={name}
				ref={ref}
				label="Gender"
				value={gender}
				onChange={handleGender}
				onBlur={onBlur}
				placeholder="Select Gender"
				fullWidth
			>
				<MenuItem value="male" sx={{ borderBottom: '1px solid #a7a2a2' }}>Male</MenuItem>
				<MenuItem value="female" sx={{}}>Female</MenuItem>
			</Select>
			<FormHelperText>{error ? error.message : ''}</FormHelperText>
		</FormControl>
	)
})
const PlaceDescription = memo(({ register, error }) => {
	console.log('description')
	const {
		onChange,
		onBlur,
		name,
		ref,
	} = register
	return (
		<FormControl
			error={Boolean(error)}
			margin="normal"
			aria-hidden="true"
		>
			<TextareaAutosize
				id="description"
				name={name}
				label="Description"
				aria-label="description"
				minRows={5}
				maxRows={7}
				placeholder="What this place offers..."
				className={`place-text-area ${error ? 'place-text-area-error' : 'place-text-area-normal'}`}
				onChange={onChange}
				onBlur={onBlur}
				ref={ref}
			/>
			<FormHelperText>{error ? error.message : ''}</FormHelperText>
		</FormControl>
	)
})
const RulesAndPreference = memo(({ register, error }) => {
	console.log('rules_and_preference')
	const {
		onChange,
		onBlur,
		name,
		ref,
	} = register
	return (
		<FormControl
			error={error}
			margin="normal"
		>
			<TextareaAutosize
				id="rules_and_preference"
				name={name}
				aria-label="rules_and_preference"
				minRows={5}
				maxRows={7}
				aria-hidden="true"
				className={`place-text-area ${error ? 'place-text-area-error' : 'place-text-area-normal'}`}
				placeholder="Rules and Preference..."
				onChange={onChange}
				onBlur={onBlur}
				ref={ref}
			/>
			<FormHelperText>{error ? error.message : ''}</FormHelperText>
		</FormControl>
	)
})
const SubmitButton = memo(({ isSubmitting }) => (
	<Button
		type="submit"
		fullWidth
		disabled={isSubmitting}
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
	Contact,
	GenderSelection,
	Header,
	PlaceDescription,
	Price,
	RulesAndPreference,
	SubmitButton,
}
