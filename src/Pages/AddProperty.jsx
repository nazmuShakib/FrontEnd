import { useState, useMemo } from 'react'
import {
	Alert,
	Box,
	FormControl,
	Snackbar,
} from '@mui/material'

import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import ImageUploader from '../components/AddProperty/ImageUploader'
import GetLocation from '../components/AddProperty/GetLocation'
import DateSelector from '../components/AddProperty/DateSelector'
import useAxiosPrivate from '../Hooks/useAxiosPrivate'

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
} from '../components/AddProperty/AddPropertyElements'

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
	division: z.string().refine((data) => data !== '', {
		message: 'Select a Division',
	}),
	district: z.string().refine((data) => data !== '', {
		message: 'Select a District',
	}),
	thana: z.string().refine((data) => data !== '', {
		message: 'Select a Thana',
	}),
	category: z
		.string()
		.min(1, 'Select a category'),
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
		})
		.refine((data) => /^(?:(?:\+|00)88|01)?\d{11}$/.test(data), { message: 'Invalid contact number' }),
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
	const axiosPrivate = useAxiosPrivate()
	const {
		register,
		handleSubmit,
		resetField,
		formState: {
			errors, isSubmitting,
		},
		setError,
		clearErrors,
		reset,
		getValues,
		control,
	} = useForm({
		resolver: zodResolver(PropertySchema),
		defaultValues: {
			title: '',
			address: '',
			gender: '',
			district: '',
			division: '',
			thana: '',
			price: '',
			contact: '',
		},
	})
	const handleData = (formData) => axiosPrivate({
		method: 'POST',
		url: '/addProperty',
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
	const { mutateAsync, isLoading } = useMutation(['post'], handleData)
	const [notification, setNotification] = useState({
		open: false,
		message: '',
		type: '',
	})
	const onSubmit = async (event) => {
		try {
			const formData = new FormData()
			const { images, ...data } = event
			images.forEach((file) => formData.append('images', file))
			formData.append('data', JSON.stringify(data))
			await mutateAsync(formData)
			setNotification({
				open: true,
				message: 'Property added successfully',
				type: 'success',
			})
		} catch (err) {
			console.log(err)
			setNotification({
				open: true,
				message: 'Failed to add property',
				type: 'error',
			})
		}
	}
	useMemo(() => {
		if (Object.keys(errors).length !== 0) {
			setNotification({
				open: true,
				message: 'There is an error. Fill up the form correctly.',
				type: 'error',
			})
		}
	}, [errors])
	const handleClose = () => {
		setNotification({ ...notification, open: false })
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
					<PlaceDescription control={control} error={errors.description} />
					<RulesAndPreference control={control} error={errors.rules_and_preference} />
					<RequiredDocuments control={control} error={errors.documents} />
					<PlaceSelection
						control={control}
						clearErrors={clearErrors}
						setError={setError}
						resetField={resetField}
						errorDivision={errors.division}
						errorDistrict={errors.district}
						errorThana={errors.thana}
					/>
					<Address control={control} error={errors.address} />
					<Price control={control} error={errors.price} />
					<Contact control={control} error={errors.contact} />
					<ImageUploader name="images" control={control} register={register} error={errors.images} />
					<GetLocation control={control} name="location" error={errors.location} />
					<SubmitButton isSubmitting={isSubmitting || isLoading} />
				</FormControl>
				{notification.open && (
					<Snackbar open={notification.open} autoHideDuration={5000} onClose={handleClose}>
						<Alert severity={notification.type} variant="filled">{notification.message}</Alert>
					</Snackbar>
				)}
			</Box>
		</Box>
	)
}
