import { memo } from 'react'
import {
	Box,
	Card,
	CardContent,
	Divider,
	Typography,
} from '@mui/material'
import { DocumentScannerOutlined } from '@mui/icons-material'

const RequiredDocuments = memo(({ requiredDocuments }) => (
	<Box sx={{
		marginTop: '10px',
		width: '100%',
		boxShadow: 1,
	}}
	>
		<Card>
			<CardContent>
				<Typography component="h1" variant="h6" textAlign="center">Required Documents</Typography>
				<Divider><DocumentScannerOutlined /></Divider>
				<Typography component="section" variant="span" sx={{ whiteSpace: 'pre-wrap' }}>
					{requiredDocuments || 'N/A'}
				</Typography>
			</CardContent>
		</Card>
	</Box>
))

export default RequiredDocuments
