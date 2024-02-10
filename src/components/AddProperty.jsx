import {
	useState,
} from 'react'
import {
	Box,
	FormControl,
} from '@mui/material'

import { useForm } from 'react-hook-form'
// import { DevTool } from '@hookform/devtools'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import ImageUploader from './Utility/ImageUploader'
import GetLocation from './Utility/GetLocation'
import DateSelector from './Utility/DateSelector'

import {
	Address,
	Contact,
	GenderSelection,
	CategorySelection,
	PlaceSelection,
	Header,
	PlaceDescription,
	Price,
	RulesAndPreference,
	RequiredDocuments,
	SubmitButton,
} from './Utility/AddPropertyElements'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const PropertySchema = z.object({
	title: z
		.string()
		.max(100, 'max 100 characters')
		.refine((data) => {
			const actualData = data.trimEnd().trimStart()
			return actualData !== ''
		}, 'Required'),
	date: z
		.date()
		.refine((value) => {
			const dif = Math.ceil((value - Date.now()) / (1000 * 60 * 60 * 24))
			return dif <= 365 && dif >= 0
		}, 'Select a day between today and the next 365 days'),
	gender: z
		.string()
		.min(1, 'Select a gender'),
	place: z
		.object({
			division: z
				.string(),
			district: z
				.string(),
			thana: z
				.string(),
		}),
	category: z
		.string()
		.min(1, 'Select a category'),
	description: z
		.string()
		.max(10, 'You can use at most 10 characters')
		.refine(
			(data) => {
				const actualData = data.trimEnd().trimStart()
				return actualData !== ''
			},
			{ message: 'Description is required' },
		),
	rules_and_preference: z
		.string()
		.max(10, 'You can use at most 10 characters')
		.optional(),
	documents: z
		.string()
		.max(500, 'You can use at most 10 characters')
		.optional(),
	price: z
		.string()
		.refine((data) => data !== '', {
			message: 'Required',
		})
		.refine((data) => parseInt(data, 10) >= 0, {
			message: 'Price must be a positive number',
		})
		.refine((data) => parseInt(data, 10) <= 1000000007, {
			message: 'Price must be less than 1000000007',
		}),
	contact: z.string()
		.refine((data) => data !== '', {
			message: 'Required',
		}),
	address: z
		.string()
		.max(100, 'You can use at most 100 characters')
		.refine(
			(data) => {
				const actualData = data.trimEnd().trimStart()
				return actualData !== ''
			},
			{ message: 'Address is required' },
		),
	images: z
		.any()
		.refine((files) => files?.length > 0, 'Image is required')
		.refine(
			(files) => files?.[0]?.size <= MAX_FILE_SIZE,
			'Max image size is 5MB.',
		)
		.refine(
			(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
			'Only .jpg, .jpeg, .png and .webp formats are supported.',
		),
	location: z
		.any()
		.refine(
			(obj) => obj !== undefined,
			'Select location of your property',
		),
})
export default function AddProperty() {
	const [location, setLocation] = useState(null)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		getValues,
		control,
	} = useForm({ resolver: zodResolver(PropertySchema), defaultValues: { gender: '' } })
	const onSubmit = (event) => {
		console.log(event)
	}
	return (
		<Box
			component="div"
			sx={{
				width: ['90%', '70%', '60%', '50%'],
				margin: 'auto',
			}}
		>
			<Box component="div">
				<FormControl fullWidth component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
					<Header control={control} error={errors.title} />
					<DateSelector name="date" control={control} error={errors.date} />
					<GenderSelection control={control} error={errors.gender} />
					<CategorySelection control={control} error={errors.category} />
					<PlaceDescription register={register('description')} error={errors.description} />
					<RulesAndPreference register={register('rules_and_preference')} error={errors.rules_and_preference} />
					<RequiredDocuments register={register('documents')} error={errors.documents} />
					<PlaceSelection control={control} error={errors.place} />
					<Address register={register('address')} error={errors.address} />
					<Price control={control} error={errors.price} />
					<Contact control={control} error={errors.contact} />
					<ImageUploader name="images" control={control} register={register} error={errors.images} />
					<GetLocation control={control} name="location" error={errors.location} />
					<SubmitButton isSubmitting={isSubmitting} />
				</FormControl>
			</Box>
		</Box>
	)
}
