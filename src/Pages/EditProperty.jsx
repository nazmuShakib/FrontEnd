import { useLocation } from 'react-router-dom'
import {
	Box,
	FormControl,
	Button,
} from '@mui/material'

import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import DateSelector from '../components/AddProperty/DateSelector'
import useAxiosPrivate from '../Hooks/useAxiosPrivate'

import {
	Address,
	Contact,
	Header,
	PlaceDescription,
	Price,
	RulesAndPreference,
	RequiredDocuments,
} from '../components/AddProperty/AddPropertyElements'

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
	description: z
		.string()
		.max(500, 'max 500 characters')
		.refine(
			(data) => {
				const actualData = data.trimEnd().trimStart()
				return actualData !== ''
			},
			{ message: 'Required' },
		),
	rules_and_preference: z
		.string()
		.max(500, 'max 500 characters')
		.optional('Optional'),
	required_documents: z
		.string()
		.max(500, 'You can use at most 10 characters')
		.optional(),
	price: z
		.union([
			z
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
			z
				.number()
				.transform((data) => String(data))
				.refine((data) => data >= 0, {
					message: 'Price must be a positive number',
				}).refine((data) => data <= 1000000007, {
					message: 'Price must be less than 1000000007',
				}),
		]),
	contact: z.string()
		.refine((data) => data !== '', {
			message: 'Required',
		}),
	address: z
		.string()
		.max(100, 'max 100 characters')
		.refine(
			(data) => {
				const actualData = data.trimEnd().trimStart()
				return actualData !== ''
			},
			{ message: 'Required' },
		),
})
export default function EditProperty() {
	const axiosPrivate = useAxiosPrivate()
	const location = useLocation()
	const { property } = location.state
	const {
		handleSubmit,
		formState: {
			errors, isSubmitting,
		},
		control,
	} = useForm({
		resolver: zodResolver(PropertySchema),
		defaultValues: {
			title: property.title,
			date: new Date(property.availableDate),
			price: property.price,
			contact: property.contact,
			address: property.address,
			description: property.description,
			rules_and_preference: property.rulesAndPreference,
			required_documents: property.requiredDocuments,
		},
	})
	const handleData = (data) => axiosPrivate({
		method: 'PUT',
		url: '/myProperty/edit',
		data,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const { mutateAsync, isLoading } = useMutation(['edit'], handleData)
	const onSubmit = async (info) => {
		try {
			const data = {
				info,
				ID: property?.ID,
			}
			const res = await mutateAsync(data)
			console.log(res)
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<Box
			component="div"
			sx={{
				width: ['90%', '70%', '60%', '50%'],
				margin: 'auto',
			}}
		>
			<Box component="div" marginTop="20px" marginBottom="20px">
				<FormControl fullWidth component="form" onSubmit={handleSubmit(onSubmit)}>
					<Header name="title" control={control} error={errors.title} />
					<DateSelector name="date" control={control} error={errors.date} />
					<PlaceDescription control={control} error={errors.description} />
					<RulesAndPreference control={control} error={errors.rules_and_preference} />
					<RequiredDocuments control={control} error={errors.documents} />
					<Address control={control} error={errors.address} />
					<Price control={control} error={errors.price} />
					<Contact control={control} error={errors.contact} />
					<Button
						disabled={isSubmitting}
						type="submit"
						variant="outlined"
					>
						Save
					</Button>
				</FormControl>
			</Box>
		</Box>
	)
}
