import {
	memo,
} from 'react'
import {
	FormControl,
	FormHelperText,
} from '@mui/material'
import { Controller } from 'react-hook-form'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'

import '../../styles/forms.css'

const DateSelector = memo(({
	name,
	control,
	error,
}) => {
	const hasError = Boolean(error)
	return (
		<FormControl
			error={hasError}
			margin="normal"
			sx={{
				'@media (min-width: 780px)': {
					width: '50%',
				},
				width: '100%',
			}}
		>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Controller
					name={name}
					control={control}
					render={({
						field: {
							onChange,
							ref,
							value,
						},
					}) => (
						<DatePicker
							label="Available Date"
							inputRef={ref}
							value={value ? dayjs(value) : null}
							className={`${error ? 'date-picker-error' : ''}`}
							onChange={(event) => {
								onChange(event.toDate())
							}}
						/>
					)}
				/>
			</LocalizationProvider>
			<FormHelperText>{error ? error.message : 'Select a date between today and the next 365 days'}</FormHelperText>
		</FormControl>
	)
})

export default DateSelector
