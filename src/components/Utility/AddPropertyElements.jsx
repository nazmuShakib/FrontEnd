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
import { getDistricts, getThanas, Divisions } from '../../Config/GeoInfo'

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
const Address = memo(({ register, error }) => {
	console.log('address')

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
			type="text"
			id="address"
			label="Address"
			placeholder="Address of the property..."
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
	const handleGender = useCallback((event) => {
		onChange(event)
		setGender(event.target.value)
	}, [onChange])
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
				<MenuItem value="female" sx={{ borderBottom: '1px solid #a7a2a2' }}>Female</MenuItem>
			</Select>
			<FormHelperText>{error ? error.message : ''}</FormHelperText>
		</FormControl>
	)
})
const CategorySelection = memo(({ register, error }) => {
	console.log('category')
	const [category, setCategory] = useState('')
	const {
		onChange,
		onBlur,
		name,
		ref,
	} = register
	const handleCategory = useCallback((event) => {
		onChange(event)
		setCategory(event.target.value)
	}, [onChange])
	return (
		<FormControl
			error={Boolean(error)}
			margin="normal"
		>
			<InputLabel id="category-select">Category</InputLabel>
			<Select
				labelId="category-select"
				id="category"
				displayEmpty
				name={name}
				ref={ref}
				label="Category"
				value={category}
				onChange={handleCategory}
				onBlur={onBlur}
				placeholder="Select Category"
				fullWidth
			>
				<MenuItem value="sublet" sx={{ borderBottom: '1px solid #a7a2a2' }}>Sublet</MenuItem>
				<MenuItem value="hostel" sx={{ borderBottom: '1px solid #a7a2a2' }}>Hostel</MenuItem>
				<MenuItem value="mess">Mess</MenuItem>
			</Select>
			<FormHelperText>{error ? error.message : ''}</FormHelperText>
		</FormControl>
	)
})
const PlaceSelection = memo(({
	registerDivision, errorDivision, registerDistrict, errorDistrict, registerThana, errorThana,
}) => {
	console.log('place_selection')
	const [division, setDivision] = useState('')
	const [district, setDistrict] = useState('')
	const [thana, setThana] = useState('')
	const [allDistricts, setAllDistricts] = useState([])
	const [allThanas, setAllThanas] = useState([])

	const handleDivision = useCallback((event) => {
		registerDivision.onChange(event)
		setDistrict('')
		setThana('')
		setDivision(event.target.value)
		setAllDistricts(getDistricts(event.target.value))
	}, [registerDivision])

	const handleDistrict = useCallback((event) => {
		registerDistrict.onChange(event)
		setThana('')
		setDistrict(event.target.value)
		setAllThanas(getThanas(event.target.value))
	}, [registerDistrict])

	const handleThana = useCallback((event) => {
		registerThana.onChange(event)
		setThana(event.target.value)
	}, [registerThana])

	useCallback(() => {
		setDistrict(allDistricts[0])
	}, [allDistricts])

	useCallback(() => {
		setThana(allThanas[0])
	}, [allThanas])

	return (
		<>
			<Division
				division={division}
				handleDivision={handleDivision}
				registerDivision={registerDivision}
				errorDivision={errorDivision}
			/>
			<District
				district={district}
				division={division}
				allDistricts={allDistricts}
				handleDistrict={handleDistrict}
				registerDistrict={registerDistrict}
				errorDistrict={errorDistrict}
			/>
			<Thana
				thana={thana}
				division={division}
				district={district}
				allThanas={allThanas}
				handleThana={handleThana}
				registerThana={registerThana}
				errorThana={errorThana}
			/>
		</>
	)
})
const Division = memo(({
	division,
	handleDivision,
	registerDivision,
	errorDivision,
}) => (
	<FormControl
		error={Boolean(errorDivision)}
		margin="normal"
	>
		<InputLabel id="division">Division</InputLabel>
		<Select
			labelId="division"
			label="Division"
			value={division}
			onChange={handleDivision}
			onBlur={registerDivision.onBlur}
			name={registerDivision.name}
			ref={registerDivision.ref}
		>
			{Divisions.map((value) => (
				<MenuItem
					key={value}
					value={value}
					sx={{ borderBottom: '1px solid #e3e3e4' }}
				>
					{value}
				</MenuItem>
			))}
		</Select>
		<FormHelperText>{errorDivision ? errorDivision.message : '*required'}</FormHelperText>
	</FormControl>
))
const District = memo(({
	division,
	district,
	allDistricts,
	handleDistrict,
	registerDistrict,
	errorDistrict,
}) => {
	const districtLabel = useMemo(() => (division === '' ? 'Select a Division' : 'District'), [division])
	return (
		<FormControl
			error={Boolean(errorDistrict)}
			margin="normal"
		>
			<InputLabel id="district">{districtLabel}</InputLabel>
			<Select
				labelId="district"
				label="District"
				value={district}
				disabled={division === ''}
				onChange={handleDistrict}
				onBlur={registerDistrict.onBlur}
				name={registerDistrict.name}
				ref={registerDistrict.ref}
			>
				{
					allDistricts.map((value) => (
						<MenuItem key={value} value={value} sx={{ borderBottom: '1px solid #e3e3e4' }}>{value}</MenuItem>
					))
				}
			</Select>
			<FormHelperText>{errorDistrict ? errorDistrict.message : '*required'}</FormHelperText>
		</FormControl>
	)
})
const Thana = memo(({
	thana,
	division,
	district,
	allThanas,
	handleThana,
	registerThana,
	errorThana,
}) => {
	const thanaLabel = useMemo(() => {
		if (division === '') {
			return 'Select a Division'
		} if (district === '') {
			return 'Select a District'
		}
		return 'Thana/Upazila'
	}, [division, district])
	return (
		<FormControl
			error={Boolean(errorThana)}
			margin="normal"
		>
			<InputLabel id="thana/upazila">{thanaLabel}</InputLabel>
			<Select
				labelId="thana/upazila"
				label="Thana/Upazila"
				value={thana}
				disabled={district === ''}
				onChange={handleThana}
				onBlur={registerThana.onBlur}
				name={registerThana.name}
				ref={registerThana.ref}
			>
				{
					allThanas.map((value) => (
						<MenuItem
							key={value}
							value={value}
							sx={{ borderBottom: '1px solid #e3e3e4' }}
						>
							{value}
						</MenuItem>
					))
				}
			</Select>
			<FormHelperText>{errorThana ? errorThana.message : '*required'}</FormHelperText>
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
			<FormLabel>Desciption</FormLabel>
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
			<FormLabel>Rules & Preferences</FormLabel>
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

const RequiredDocuments = memo(({ register, error }) => {
	console.log('required_documents')
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
			<FormLabel>Required Documents</FormLabel>
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
	Address,
	Contact,
	GenderSelection,
	CategorySelection,
	Header,
	PlaceDescription,
	PlaceSelection,
	Price,
	RulesAndPreference,
	RequiredDocuments,
	SubmitButton,
}
