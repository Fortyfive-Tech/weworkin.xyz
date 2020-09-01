import {countries} from 'countries-list'

// Data to populate countries dropdown, formatted and sorted a->z
const countriesList = Object.keys(countries).map((countryCode) => {
    return {
        value : countries[countryCode].name,
        label : countries[countryCode].name
    }
}).sort((a, b) => a.label.localeCompare(b.label))

export default countriesList