import {
	memo,
	useState,
	useCallback,
	useMemo,
	useEffect,
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
	FormLabel,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { getDistricts, getThanas, Divisions } from '../../Config/GeoInfo'

import '../../styles/forms.css'

const Header = memo(({ control, error }) => {
	console.log('header')
	return (
		<Controller
			name="title"
			control={control}
			render={({
				field: {
					onChange,
					onBlur,
					ref,
					name,
					value,
				},
			}) => (
				<TextField
					name={name}
					id="title"
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
					label="Title"
					placeholder="Give a suitable title"
					type="text"
					error={!!error}
					helperText={error ? error.message : 'Required'}
				/>
			)}
		/>
	)
})
const Price = memo(({ control, error }) => {
	console.log('price')
	return (
		<Controller
			name="price"
			control={control}
			render={({
				field: {
					onChange,
					onBlur,
					ref,
					name,
					value,
				},
			}) => (
				<TextField
					margin="normal"
					id="price"
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
					type="number"
					label="Price"
					placeholder="Price of the property..."
					error={!!error}
					helperText={error ? error.message : 'Required'}
				/>
			)}
		/>
	)
})
const Contact = memo(({ control, error }) => {
	console.log('contact')
	return (
		<Controller
			name="contact"
			control={control}
			render={({
				field: {
					onChange,
					onBlur,
					ref,
					name,
					value,
				},
			}) => (
				<TextField
					margin="normal"
					id="contact"
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
					type="tel"
					label="Contact"
					placeholder="Enter your contact number"
					error={!!error}
					helperText={error ? error.message : 'Required'}
				/>
			)}
		/>
	)
})
const PaymentAccount = memo(({ control, error }) => {
	console.log('payment account')
	return (
		<Controller
			name="bkash"
			control={control}
			render={({
				field: {
					onChange,
					onBlur,
					ref,
					name,
					value,
				},
			}) => (
				<TextField
					margin="normal"
					id="bkash"
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
					type="tel"
					label="Bkash Number"
					placeholder="Enter your bkash account number"
					error={!!error}
					helperText={error ? error.message : 'Required'}
				/>
			)}
		/>
	)
})
const Address = memo(({ control, error }) => {
	console.log('address')
	return (
		<Controller
			name="address"
			control={control}
			render={({
				field: {
					onChange,
					onBlur,
					ref,
					name,
					value,
				},
			}) => (
				<TextField
					margin="normal"
					id="address"
					name={name}
					value={value}
					placeholder="Address of the property..."
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
					type="text"
					label="Address"
					error={!!error}
					helperText={error ? error.message : 'Required'}
				/>
			)}
		/>
	)
})
const GenderSelection = memo(({
	control,
	error,
}) => {
	console.log('gender')
	return (
		<FormControl
			error={Boolean(error)}
			margin="normal"
		>
			<InputLabel id="gender-select">Gender</InputLabel>
			<Controller
				name="gender"
				control={control}
				defaultValue=""
				render={({
					field: {
						onChange,
						onBlur,
						ref,
						name,
						value,
					},
				}) => (
					<Select
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						name={name}
						ref={ref}
						label="Gender"
						labelId="gender-select"
						placeholder="Select Gender"
						id="gender"
						fullWidth
					>
						<MenuItem value="Male" sx={{ borderBottom: '1px solid #a7a2a2' }}>Male</MenuItem>
						<MenuItem value="Female" sx={{ borderBottom: '1px solid #a7a2a2' }}>Female</MenuItem>
					</Select>
				)}
			/>
			<FormHelperText>{error ? error.message : ''}</FormHelperText>
		</FormControl>
	)
})
const CategorySelection = memo(({ control, error }) => {
	console.log('category')
	return (
		<FormControl
			error={Boolean(error)}
			margin="normal"
		>
			<InputLabel id="category-select">Category</InputLabel>
			<Controller
				name="category"
				control={control}
				defaultValue=""
				render={({
					field: {
						onChange,
						onBlur,
						ref,
						name,
						value,
					},
				}) => (
					<Select
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						name={name}
						ref={ref}
						label="Category"
						labelId="category-select"
						placeholder="Select Category"
						id="category"
						fullWidth
					>
						<MenuItem value="Sublet" sx={{ borderBottom: '1px solid #a7a2a2' }}>Sublet</MenuItem>
						<MenuItem value="Hostel" sx={{ borderBottom: '1px solid #a7a2a2' }}>Hostel</MenuItem>
						<MenuItem value="Mess" sx={{ borderBottom: '1px solid #a7a2a2' }}>Mess</MenuItem>
					</Select>
				)}
			/>
			<FormHelperText>{error ? error.message : ''}</FormHelperText>
		</FormControl>
	)
})

const PlaceSelection = memo(({
	control,
	clearErrors,
	setError,
	resetField,
	errorDivision,
	errorDistrict,
	errorThana,
}) => {
	const [division, setDivision] = useState('')
	const [district, setDistrict] = useState('')
	const [thana, setThana] = useState('')
	const [allDistricts, setAllDistricts] = useState([])
	const [allThanas, setAllThanas] = useState([])

	const handleDivision = (value) => {
		setDivision(value)
		setThana('')
		setDistrict('')
		setAllDistricts(getDistricts(value))
		resetField('district')
		resetField('thana')
		setError('district', { message: 'Select a District' })
		setError('thana', { message: 'Select a Thana/Upazila' })
	}

	const handleDistrict = (event) => {
		setThana('')
		setDistrict(event.target.value)
		setAllThanas(getThanas(event.target.value))
		clearErrors('district')
		resetField('thana')
		setError('thana', { message: 'Select a Thana/Upazila' })
	}

	const handleThana = (event) => {
		setThana(event.target.value)
		clearErrors('thana')
	}
	const districtLabel = useMemo(() => (division === '' ? 'Select a Division' : 'District'), [division])

	const thanaLabel = useMemo(() => {
		if (division === '') {
			return 'Select a Division'
		} if (district === '') {
			return 'Select a District'
		}
		return 'Thana/Upazila'
	}, [division, district])

	return (
		<>
			<Division
				control={control}
				error={errorDivision}
				handleDivision={handleDivision}
				division={division}
			/>
			<District
				control={control}
				error={errorDistrict}
				handleDistrict={handleDistrict}
				district={district}
				division={division}
				districtLabel={districtLabel}
				allDistricts={allDistricts}
			/>
			<Thana
				control={control}
				error={errorThana}
				allThanas={allThanas}
				thana={thana}
				thanaLabel={thanaLabel}
				handleThana={handleThana}
				district={district}
			/>
		</>
	)
})

const Division = memo(({
	control, error, handleDivision, division,
}) => {
	console.log('division')
	return (
		<FormControl
			error={Boolean(error)}
			margin="normal"
		>
			<InputLabel id="division">Division</InputLabel>
			<Controller
				defaultValue=""
				name="division"
				control={control}
				render={({
					field: {
						onChange,
						onBlur,
						ref,
						name,
					},
				}) => (
					<Select
						value={division}
						onChange={(event) => {
							onChange(event)
							handleDivision(event.target.value)
						}}
						onBlur={onBlur}
						name={name}
						ref={ref}
						label="Division"
						labelId="place-division"
						placeholder="Select Division"
						id="division"
						fullWidth
					>
						{Divisions.map((divisionName) => (
							<MenuItem
								key={divisionName}
								value={divisionName}
								sx={{ borderBottom: '1px solid #e3e3e4' }}
							>
								{divisionName}
							</MenuItem>
						))}
					</Select>
				)}
			/>
			<FormHelperText>{error ? error.message : 'Required'}</FormHelperText>
		</FormControl>
	)
})

const District = memo(({
	control,
	error,
	handleDistrict,
	district,
	division,
	districtLabel,
	allDistricts,
}) => {
	console.log('division')
	return (
		<FormControl
			error={Boolean(error)}
			margin="normal"
		>
			<InputLabel id="district">{districtLabel}</InputLabel>
			<Controller
				name="district"
				control={control}
				render={({
					field: {
						onChange,
						onBlur,
						ref,
						name,
					},
				}) => (
					<Select
						value={district}
						onChange={(event) => {
							onChange(event.target.value)
							handleDistrict(event)
						}}
						onBlur={onBlur}
						name={name}
						ref={ref}
						disabled={division === ''}
						label="District"
						labelId="place-district"
						placeholder="Select District"
						id="district"
						fullWidth
					>
						{
							allDistricts.map((districtName) => (
								<MenuItem
									key={districtName}
									value={districtName}
									sx={{ borderBottom: '1px solid #e3e3e4' }}
								>
									{districtName}
								</MenuItem>
							))
						}
					</Select>
				)}
			/>
			<FormHelperText>{error ? error.message : 'Required'}</FormHelperText>
		</FormControl>
	)
})

const Thana = memo(({
	control,
	error,
	allThanas,
	thana,
	thanaLabel,
	handleThana,
	district,
}) => {
	console.log('thana')
	return (
		<FormControl
			error={Boolean(error)}
			margin="normal"
		>
			<InputLabel id="thana">{thanaLabel}</InputLabel>
			<Controller
				name="thana"
				control={control}
				render={({
					field: {
						onChange,
						onBlur,
						ref,
						name,
					},
				}) => (
					<Select
						value={thana}
						onChange={(event) => {
							onChange(event)
							handleThana(event)
						}}
						onBlur={onBlur}
						name={name}
						ref={ref}
						disabled={district === ''}
						label="Thana/Upazila"
						labelId="place-thana"
						placeholder="Select Thana/Upazila"
						id="thana"
						fullWidth
					>
						{
							allThanas.map((thanaName) => (
								<MenuItem
									key={thanaName}
									value={thanaName}
									sx={{ borderBottom: '1px solid #e3e3e4' }}
								>
									{thanaName}
								</MenuItem>
							))
						}
					</Select>
				)}
			/>
			<FormHelperText>{error ? error.message : 'Required'}</FormHelperText>
		</FormControl>
	)
})

const PlaceDescription = memo(({ control, error }) => {
	console.log('place_description')
	return (
		<FormControl
			error={Boolean(error)}
			margin="normal"
			aria-hidden="true"
		>
			<FormLabel>Desciption</FormLabel>

			<Controller
				name="description"
				control={control}
				render={({
					field: {
						onChange, onBlur, ref, name, value,
					},
				}) => (
					<TextareaAutosize
						id="description"
						name={name}
						value={value}
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
				)}
			/>

			<FormHelperText>{error ? error.message : 'Required'}</FormHelperText>
		</FormControl>
	)
})

const RulesAndPreference = memo(({ control, error }) => {
	console.log('rules_and_preference')
	return (
		<FormControl
			error={Boolean(error)}
			margin="normal"
			aria-hidden="true"
		>
			<FormLabel>Rules & Preferences</FormLabel>

			<Controller
				name="rules_and_preference"
				control={control}
				render={({
					field: {
						onChange, onBlur, ref, name, value,
					},
				}) => (
					<TextareaAutosize
						id="rules_and_preference"
						name={name}
						value={value}
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
				)}
			/>
			<FormHelperText>{error ? error.message : 'Optional'}</FormHelperText>
		</FormControl>
	)
})

const RequiredDocuments = memo(({ control, error }) => {
	console.log('required_documents')
	return (
		<FormControl
			error={Boolean(error)}
			margin="normal"
			aria-hidden="true"
		>
			<FormLabel>Required Documents</FormLabel>

			<Controller
				name="required_documents"
				control={control}
				render={({
					field: {
						onChange, onBlur, ref, name, value,
					},
				}) => (
					<TextareaAutosize
						id="required_documents"
						name={name}
						value={value}
						aria-label="required_documents"
						minRows={5}
						maxRows={7}
						aria-hidden="true"
						className={`place-text-area ${error ? 'place-text-area-error' : 'place-text-area-normal'}`}
						placeholder="Required Documents..."
						onChange={onChange}
						onBlur={onBlur}
						ref={ref}
					/>
				)}
			/>
			<FormHelperText>{error ? error.message : 'Optional'}</FormHelperText>
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
	Address,
	PaymentAccount,
	Contact,
	GenderSelection,
	CategorySelection,
	Header,
	PlaceSelection,
	PlaceDescription,
	Price,
	RulesAndPreference,
	RequiredDocuments,
	SubmitButton,
}
