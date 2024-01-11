import {
	Box,
	AppBar,
	Toolbar,
	CssBaseline,
} from '@mui/material'
import HomeButton from './Utility/HomeButton'
import MyFavoritesButton from './Utility/MyFavorites'
import MyPropertyButton from './Utility/MyPropertyButton'
import AddPropertyButton from './Utility/AddPropertyButton'
import LoginButton from './Utility/LoginButton'
import SearchBar from './Utility/SearchBar'
import MenuBar from './Utility/MenuBar'

export default function NavBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<CssBaseline />
			<AppBar
				position="static"
				sx={{
					backgroundColor: '#f0f2f7',
					width: '100%',
				}}
			>
				<Box
					component="div"
					sx={{
						display: 'flex',
						justifyContent: 'space-around',
					}}
				>
					{/* Menu Bar */}
					<MenuBar />
					{/* Navigation links for Home, My Favorites and My Property */}
					<Toolbar
						sx={{
							display: 'flex',
							justifyContent: 'space-around',
							width: '90%',
						}}
					>
						{/* Home button */}
						<HomeButton />
						{/* My Favorites button */}
						<MyFavoritesButton />
						{/* My Properties button */}
						<MyPropertyButton />
					</Toolbar>
					{/* Button section */}
					<Box
						component="div"
						sx={{
							display: 'flex',
							width: '100%',
							mt: 2,
							mb: 2,
							mr: 2,
							flexDirection: 'flex-end',
							justifyContent: 'end',
						}}
					>
						{/* Search Button */}
						<SearchBar />
						{/* Add Property Button */}
						<AddPropertyButton />
						{/* Login Button */}
						<LoginButton />
					</Box>
				</Box>
			</AppBar>
		</Box>
	)
}
