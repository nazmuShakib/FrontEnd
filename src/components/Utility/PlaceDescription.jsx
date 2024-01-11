import {
	Card,
	CardContent,
	Typography,
	Box,
	Divider,
} from '@mui/material'
import { DescriptionOutlined } from '@mui/icons-material'

export default function PlaceDescription() {
	return (
		<Box sx={{
			margin: 'auto',
			width: '100%',
			boxShadow: 1,
		}}
		>
			<Card>
				<CardContent>
					<Typography component="h1" variant="h6" textAlign="center">What this place offers</Typography>
					<Divider><DescriptionOutlined /></Divider>
					<Typography component="section" variant="span">
						সুন্দর ও মনোরম পরিবেশে ৭ম তলায় ১৬০৫ স্কয়ার ফিটের বাসা ভাড়া হবে।
					</Typography>
					<Typography component="section" variant="span">
						(এই বাসায় শুধু ৬টা ফ্ল্যাট রয়েছে তাই কোনরকম জামেলা নেই)
					</Typography>
					<Typography component="section" variant="span">
						রানিং মাস অথবা ১লা ফেব্রুয়ারি, ২০২৪ থেকে ফ্যামিলি বাসা ভাড়া হবে।
					</Typography>
					<Typography component="section" variant="span">
						(*ব্যাচেলর দেওয়া হবেনা*)
					</Typography>
					<Typography component="section" variant="span">
						৩ বেড
					</Typography>
					<Typography component="section" variant="span">
						৩ বাথ (মাস্টার বাথসহ)
					</Typography>
					<Typography component="section" variant="span">
						২ বারান্দা
					</Typography>
					<Typography component="section" variant="span">
						২ বারান্দা
					</Typography>
					<Typography component="section" variant="span">
						২ বারান্দা
					</Typography>
					<Typography component="section" variant="span">🫱২ বেড ১ ড্রয়িং এর ফ্ল্যাট🏘️(১ম/২য় তলা</Typography>
					<Typography component="section" variant="span">💁‍♂️অত্যন্ত মনোরম পরিবেশে ফ্ল্যাট ভাড়া🏡</Typography>
					<Typography component="section" variant="span">🫱লাইনের গ্যাস♨🔥</Typography>
					<Typography component="section" variant="span">বিদ্যুৎ প্রিপেইড কার্ড😊</Typography>
				</CardContent>
			</Card>
		</Box>
	)
}
