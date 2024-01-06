import {
	Box,
	Card,
	CardContent,
	Divider,
	Typography,
} from '@mui/material'
import { RemoveCircleOutline } from '@mui/icons-material'

export default function RulesAndPreferences() {
	return (
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
					<Typography component="section" variant="span"> (*ব্যাচেলর দেওয়া হবেনা*)</Typography>
					<Typography component="section" variant="span"> (*ব্যাচেলর দেওয়া হবেনা*)</Typography>
					<Typography component="section" variant="span"> (*ব্যাচেলর দেওয়া হবেনা*)</Typography>
					<Typography component="section" variant="span"> (*ব্যাচেলর দেওয়া হবেনা*)</Typography>
				</CardContent>
			</Card>
		</Box>
	)
}
