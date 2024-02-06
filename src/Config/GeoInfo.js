import info from './Json/sorted_data.json'

const Divisions = info.divisions.map((division) => division.name)

function getDistricts(division) {
	const result = (info.divisions.find((div) => div.name === division))
	if (result) return result.districts.map((district) => district.name)
	return []
}
function getThanas(district) {
	const result = (info.divisions.find((div) => div.districts.find((dist) => dist.name === district)))
	if (result) return result.districts.find((dist) => dist.name === district).thana
	return []
}
export { getDistricts, getThanas, Divisions }
