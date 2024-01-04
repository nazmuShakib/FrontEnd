import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Property from './components/Property'

function App() {
	return (
		<Routes>
			<Route path="/" element={<h1>Home</h1>} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route path="/property" element={<Property />} />
		</Routes>
	)
}
export default App
