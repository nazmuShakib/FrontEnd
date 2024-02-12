import { useJsApiLoader } from '@react-google-maps/api'

const libraries = ['places']
const useGooglePlaces = () => useJsApiLoader({
	googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
	libraries,
})
export default useGooglePlaces
