import {
	Box,
	Divider,
} from '@mui/material'
import PropertyHeader from './Utility/PropertyHeader'
import ImagesAndDescription from './Utility/ImagesAndDescription'
import PlaceInfo from './Utility/PlaceInfo'
import RulesAndPreferences from './Utility/RuleAndPreferences'

// Basic image slider
// TODO change the left and right slider arrows
// Use utility function for each section
export default function ImageGallery() {
	return (
		<Box
			component="div"
			sx={{
				marginLeft: '1%',
				marginRight: '1%',
				'@media (min-width: 600px)': {
					marginLeft: '7%',
					marginRight: '7%',
				},
				'@media (min-width: 1000px)': {
					marginLeft: '10%',
					marginRight: '10%',
				},
			}}
		>
			<PropertyHeader />
			<Divider variant="middle" />
			<ImagesAndDescription />
			<PlaceInfo />
			<RulesAndPreferences />
		</Box>
	)
}
