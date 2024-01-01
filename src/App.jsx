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
				<Route path="/" element={<h1>Home page</h1>} />
				<Route
					path="/my-favorites"
					element={<h1>Favorites button clicked</h1>}
				/>
				<Route
					path="/my-properties"
					element={<h1>Properties button clicked</h1>}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
			</Routes>
		</Box>
	)
}
export default App
