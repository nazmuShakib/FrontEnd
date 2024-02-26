import { Routes, Route } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NavBar from './Pages/NavBar'
import Property from './Pages/Property'
import AddProperty from './Pages/AddProperty'
import SearchResult from './Pages/SearchResult'
import useGooglePlaces from './Hooks/useGooglePlaces'
import GooglePlacesContext from './Contexts/GooglePlacesLoader'

function App() {
	const { isLoaded } = useGooglePlaces()
	const queryClient = new QueryClient()
	return (
		<Box component="div">
			<QueryClientProvider client={queryClient}>
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
							path="/results"
							element={<SearchResult />}
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
			</QueryClientProvider>
		</Box>
	)
}
export default App
