import {
	Box,
	FormControl,
	FormHelperText,
} from '@mui/material'
import {
	FilePond,
	registerPlugin,
} from 'react-filepond'
import { Controller } from 'react-hook-form'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import '../../styles/image-dropper.css'

registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
)

export default function ImageUploader({
	name,
	control,
	error,
}) {
	return (
		<FormControl error={Boolean(error)} margin="normal">
			<Controller
				name={name}
				control={control}
				rules={{ required: 'Image required' }}
				render={({
					field: {
						onChange, onBlur, value,
					},
				}) => (

					<FilePond
						name={name}
						files={value}
						allowMultiple
						checkValidity
						storeAsFile
						allowReorder
						onupdatefiles={(fileItems) => {
							onChange(fileItems.map((fileItem) => fileItem.file))
							onBlur(fileItems.map((fileItem) => fileItem.file))
						}}
						onprocessfile={(_error, file) => {
							onBlur(file)
						}}
						acceptedFileTypes={['image/*']}
						maxFiles={10}
						labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
						credits={false}
					/>
				)}
			/>
			<FormHelperText>{error ? error.message : 'Only .jpg, .jpeg, .png and .webp formats are supported.'}</FormHelperText>
		</FormControl>
	)
}
