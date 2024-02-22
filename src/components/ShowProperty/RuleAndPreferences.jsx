import { memo } from 'react'
import {
	Box,
	Card,
	CardContent,
	Divider,
	Typography,
} from '@mui/material'
import { RemoveCircleOutline } from '@mui/icons-material'

const RulesAndPreferences = memo(({ rulesAndPreference }) => (
	<Box sx={{
		marginTop: '10px',
		width: '100%',
		boxShadow: 1,
	}}
	>
		<Card>
			<CardContent>
				<Typography component="h1" variant="h6" textAlign="center">Rules & Preferences</Typography>
				<Divider><RemoveCircleOutline /></Divider>
				<Typography component="section" variant="span" sx={{ whiteSpace: 'pre-wrap' }}>
					{rulesAndPreference || 'N/A'}
				</Typography>
			</CardContent>
		</Card>
	</Box>
))

export default RulesAndPreferences
