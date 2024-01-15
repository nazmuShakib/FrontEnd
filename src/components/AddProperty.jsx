import {
	useState,
} from 'react'
import {
	Box,
	Checkbox,
	FormControl,
	FormControlLabel,
	TextField,
	InputLabel,
	Button,
	MenuItem,
	Select,
	Typography,
	TextareaAutosize,
} from '@mui/material'
import ImageUploader from './Utility/ImageUploader'
import GetLocation from './Utility/GetLocation'

export default function AddProperty() {
	const [email, setEmail] = useState(false)
	const [gender, setGender] = useState('')
	const [location, setLocation] = useState(null)

	const handleGender = (event) => {
		console.log(event)
		setGender(event.target.value)
	}
	const handleEmailCheckBoxChange = (event) => {
		setEmail(event.target.checked)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		data.append('location', JSON.stringify(location))
	}
	return (
		<Box
			sx={{
				width: ['90%', '70%', '60%', '50%'],
				margin: 'auto',
			}}
		>
			<Box>
				<FormControl fullWidth component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
					<TextareaAutosize
						id="description"
						name="description"
						label="Description"
						aria-label="description"
						minRows={5}
						maxRows={7}
						placeholder="What this place offers..."
						// value={text}
						// onChange={handleChange}
						style={{
							width: '100%',
							padding: '8px',
							boxSizing: 'border-box',
							fontSize: '1em',
							resize: 'none',
						}}
					/>
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
					<TextField
						margin="normal"
						required
						fullWidth
						name="price"
						type="number"
						id="price"
						label="Price"
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="contact"
						type="tel"
						id="contact"
						label="Contact"
					/>

					<FormControlLabel name="emailCheckbox" control={<Checkbox checked={email} onChange={handleEmailCheckBoxChange} />} label="Email" />
					{email && (
						<TextField
							margin="normal"
							required
							fullWidth
							name="email"
							type="email"
							id="email"
							label="Email"
						/>
					)}
					<ImageUploader />
					<GetLocation getLocation={setLocation} />
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
				</FormControl>
			</Box>
		</Box>
	)
}
