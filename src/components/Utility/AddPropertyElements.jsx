import {
	memo,
	useState,
	useCallback,
	useMemo,
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
				},
			}) => (
				<TextField
					name={name}
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
					label="Title"
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
				},
			}) => (
				<TextField
					margin="normal"
					id="price"
					name={name}
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
					type="number"
					label="Price"
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
				},
			}) => (
				<TextField
					margin="normal"
					id="contact"
					name={name}
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
					type="tel"
					label="Contact"
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
				},
			}) => (
				<TextField
					margin="normal"
					id="address"
					name={name}
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
						<MenuItem value="male" sx={{ borderBottom: '1px solid #a7a2a2' }}>Male</MenuItem>
						<MenuItem value="female" sx={{ borderBottom: '1px solid #a7a2a2' }}>Female</MenuItem>
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
						<MenuItem value="sublet" sx={{ borderBottom: '1px solid #a7a2a2' }}>Sublet</MenuItem>
						<MenuItem value="hostel" sx={{ borderBottom: '1px solid #a7a2a2' }}>Hostel</MenuItem>
						<MenuItem value="mess" sx={{ borderBottom: '1px solid #a7a2a2' }}>Mess</MenuItem>
					</Select>
				)}
			/>
			<FormHelperText>{error ? error.message : ''}</FormHelperText>
		</FormControl>
	)
})

const PlaceSelection = memo(({ control, error }) => {
	console.log('DemoPlaceSelection')
	const [division, setDivision] = useState('')
	const [district, setDistrict] = useState('')
	const [thana, setThana] = useState('')
	const [allDistricts, setAllDistricts] = useState([])
	const [allThanas, setAllThanas] = useState([])

	const handleDivision = useCallback((event) => {
		setDistrict('')
		setThana('')
		setDivision(event.target.value)
		setAllDistricts(getDistricts(event.target.value))
	}, [])

	const handleDistrict = useCallback((event) => {
		setThana('')
		setDistrict(event.target.value)
		setAllThanas(getThanas(event.target.value))
	}, [])

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
			<FormControl
				error={Boolean(error?.division)}
				margin="normal"
			>
				<InputLabel id="place.division">Division</InputLabel>
				<Controller
					name="place.division"
					control={control}
					render={useCallback(({
						field: {
							onChange,
							onBlur,
							ref,
							name,
						},
					}) => {
						console.log('division')
						return (
							<Select
								value={division}
								onChange={(event) => {
									onChange(event)
									handleDivision(event)
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
						)
					}, [division, handleDivision])}
				/>
				<FormHelperText>{error?.division ? error.division.message : '*required'}</FormHelperText>
			</FormControl>

			<FormControl
				error={Boolean(error?.district)}
				margin="normal"
			>
				<InputLabel id="place.district">{districtLabel}</InputLabel>
				<Controller
					name="place.district"
					control={control}
					render={useCallback(({
						field: {
							onChange,
							onBlur,
							ref,
							name,
						},
					}) => {
						console.log('district')
						return (
							<Select
								value={district}
								onChange={(event) => {
									onChange(event)
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
						)
					}, [allDistricts, district, division, handleDistrict])}
				/>
				<FormHelperText>{error?.district ? error.district.message : '*required'}</FormHelperText>
			</FormControl>

			<FormControl
				error={Boolean(error?.thana)}
				margin="normal"
			>
				<InputLabel id="place.thana">{thanaLabel}</InputLabel>
				<Controller
					name="place.thana"
					control={control}
					render={useCallback(({
						field: {
							onChange,
							onBlur,
							ref,
							name,
						},
					}) => {
						console.log('thana')
						return (
							<Select
								value={thana}
								onChange={(event) => {
									onChange(event)
									setThana(event.target.value)
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
						)
					}, [district, allThanas, thana])}
				/>
				<FormHelperText>{error?.thana ? error.thana.message : '*required'}</FormHelperText>
			</FormControl>
		</>
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
						onChange, onBlur, ref, name,
					},
				}) => (
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
						onChange, onBlur, ref, name,
					},
				}) => (
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
						onChange, onBlur, ref, name,
					},
				}) => (
					<TextareaAutosize
						id="required_documents"
						name={name}
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
