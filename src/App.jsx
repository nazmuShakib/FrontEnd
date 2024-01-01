import { Routes, Route } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import Login from './components/Login'
import Register from './components/Register'
import NavBar from './components/NavBar'

function App() {
	return (
		<Box component="div">
			<CssBaseline />
			<NavBar />
			<Routes>
				<Route
					exact
					path="/"
					element={<h1>Home page</h1>}
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
			</Routes>
		</Box>
	)
}
export default App
