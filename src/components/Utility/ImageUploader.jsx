import { Box } from '@mui/material'
import {
	FilePond,
	registerPlugin,
} from 'react-filepond'

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

export default function ImageUploader() {
	return (
		<Box sx={{
			maxHeight: '400px',
			overflow: 'auto',
		}}
		>
			<FilePond
				name="images"
				required
				allowMultiple
				checkValidity
				storeAsFile
				acceptedFileTypes={['image/*']}
				maxFiles={10}
				labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
				credits={false}
			/>
		</Box>
	)
}
