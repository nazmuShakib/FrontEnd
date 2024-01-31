import {
	memo,
} from 'react'
import {
	FormControl,
	FormHelperText,
} from '@mui/material'
import { Controller } from 'react-hook-form'

import { DatePicker, AdapterDayjs, LocalizationProvider } from '@mui/x-date-pickers'
import '../../styles/forms.css'

const DateSelector = memo(({
	name,
	control,
	error,
}) => {
	const hasError = Boolean(error)
	return (
		<FormControl error={hasError} margin="normal">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Controller
					name={name}
					control={control}
					render={({
						field: {
							onChange,
							ref,
						},
					}) => (
						<DatePicker
							label="Available Date"
							inputRef={ref}
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
