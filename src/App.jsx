import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'

function App() {
	return (
		<Routes>
			<Route path="/" element={<h1>Home</h1>} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	)
}
export default App
