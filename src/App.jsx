import { Routes, Route } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import Home from './Pages/Home'
import Login from './components/Login'
import Register from './components/Register'
import NavBar from './components/NavBar'
import Property from './components/Property'
import AddProperty from './components/AddProperty'
import useGooglePlaces from './Hooks/useGooglePlaces'
import GooglePlacesContext from './Contexts/GooglePlacesLoader'

function App() {
	const { isLoaded } = useGooglePlaces()
	return (
		<Box component="div">
			<GooglePlacesContext.Provider value={isLoaded}>
				<CssBaseline />
				<NavBar />
				<Routes>
					<Route
						exact
						path="/"
						element={<Home />}
					/>
					<Route
						exact
						path="/my-favorites"
						element={<h1>Favorites button clicked</h1>}
					/>
					<Route
						exact
						path="/my-properties"
						element={<h1>Properties button clicked</h1>}
					/>
					<Route
						exact
						path="/register"
						element={<Register />}
					/>
					<Route
						exact
						path="/login"
						element={<Login />}
					/>
					<Route path="/property" element={<Property />} />
					<Route path="/add" element={<AddProperty />} />
				</Routes>
			</GooglePlacesContext.Provider>
		</Box>
	)
}
export default App
