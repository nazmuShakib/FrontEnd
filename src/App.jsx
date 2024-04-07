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
import MyProperties from './Pages/MyProperties'
import useGooglePlaces from './Hooks/useGooglePlaces'
import ProtectedRoute from './components/Authentication/ProtectedRoute'
import GooglePlacesContext from './Contexts/GooglePlacesLoader'
import { AuthProvider } from './Contexts/authProvider'

function App() {
	const { isLoaded } = useGooglePlaces()
	const queryClient = new QueryClient()
	return (
		<Box component="div">
			<QueryClientProvider client={queryClient}>
				<GooglePlacesContext.Provider value={isLoaded}>
					<AuthProvider>
						<CssBaseline />
						<Routes>
							<Route element={<NavBar />}>
								<Route
									exact
									path="/"
									element={<Home />}
								/>
								<Route element={<ProtectedRoute />}>
									<Route
										exact
										path="/my-favorites"
										element={<h1>Favorites button clicked</h1>}
									/>
									<Route
										exact
										path="/my-properties"
										element={<MyProperties />}
									/>
									<Route path="/add" element={<AddProperty />} />
								</Route>
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
							</Route>
						</Routes>
					</AuthProvider>
				</GooglePlacesContext.Provider>
			</QueryClientProvider>
		</Box>
	)
}
export default App
