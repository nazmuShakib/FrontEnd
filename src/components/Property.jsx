import {
	Box,
	Divider,
} from '@mui/material'
import PropertyHeader from './Utility/PropertyHeader'
import ImagesAndDescription from './Utility/ImagesAndDescription'

// Basic image slider
// TODO change the left and right slider arrows
// Use utility function for each section
export default function ImageGallery() {
	return (
		<Box component="div">
			<PropertyHeader />
			<Divider variant="middle" />
			<ImagesAndDescription />
		</Box>
	)
}
