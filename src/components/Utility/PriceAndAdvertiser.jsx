import { Box } from '@mui/material'
import Price from './Price'
import Advertiser from './Advertiser'

export default function PriceAndDescription() {
	return (
		<Box
			sx={{
				display: 'block',
				'@media (min-width: 900px)': {
					display: 'flex',
					marginTop: '10px',
					justifyContent: 'center',
					alignItems: 'center',
				},
			}}
		>
			<Price />
			<Box
				display="none"
				sx={{
					'@media (min-width: 900px)': {
						display: 'flex',
						margin: 0.75,
					},
				}}
			/>
			<Advertiser />
		</Box>
	)
}
