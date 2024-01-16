import {
	useState,
} from 'react'
import {
	Box,
	FormControl,
} from '@mui/material'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import ImageUploader from './Utility/ImageUploader'
import GetLocation from './Utility/GetLocation'

import {
	AvailableDate,
	Contact,
	GenderSelection,
	Header,
	PlaceDescription,
	Price,
	RulesAndPreference,
	SubmitButton,
} from './Utility/AddPropertyElements'

const PropertySchema = z.object({
	title: z
		.string()
		.max(5, 'Title length should be less than or equal to 5 characters')
		.refine((data) => {
			const actualData = data.trimEnd().trimStart()
			return actualData !== ''
		}, {
			message: 'Title is required',
		}),
	date: z
		.string()
		.refine((value) => {
			const dif = Math.ceil((new Date(value) - Date.now()) / (1000 * 60 * 60 * 24))
			return dif <= 366 && dif >= 0
		}, 'Select a day between today and the next 365 days'),
	gender: z.string().min(1, 'Select a gender'),
	description: z.string()
		.max(10, 'You can use at most 10 characters')
		.refine((data) => {
			const actualData = data.trimEnd().trimStart()
			return actualData !== ''
		}, {
			message: 'Rules and Preferences are required',
		}),
	rules_and_preference: z
		.string()
		.max(10, 'You can use at most 10 characters')
		.optional(),
	price: z
		.string()
		.refine((data) => parseInt(data, 10) >= 0, {
			message: 'Price should be postive',
		}),
	contact: z.string()
		.refine((data) => data !== '', {
			message: 'Contact is required',
		}),
})
export default function AddProperty() {
	const [location, setLocation] = useState(null)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		getValues,
	} = useForm({ resolver: zodResolver(PropertySchema), defaultValues: { gender: '' } })
	const onSubmit = (event) => {
		console.log('here')
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
					<Header register={register('title')} error={errors.title} />
					<AvailableDate register={register('date')} error={errors.date} />
					<GenderSelection register={register('gender')} error={errors.gender} />
					<PlaceDescription register={register('description')} error={errors.description} />
					<RulesAndPreference register={register('rules_and_preference')} error={errors.rules_and_preference} />
					<Price register={register('price')} error={errors.price} />
					<Contact register={register('contact')} error={errors.contact} />
					<ImageUploader />
					<GetLocation getLocation={setLocation} />
					<SubmitButton isSubmitting={isSubmitting} />
				</FormControl>
			</Box>
		</Box>
	)
}
