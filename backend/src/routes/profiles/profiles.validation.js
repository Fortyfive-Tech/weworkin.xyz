import Joi from '@hapi/joi'
import { countries } from 'countries-list'

const countriesList = Object.keys(countries).map((countryCode) => {
    return countries[countryCode].name
})

const profilePayloadSchema = Joi.object({
    profileDetails: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        description: Joi.string().max(350),
        position_title: Joi.string().max(40),
        linkedin_url: Joi.string().uri(),
        resume_url: Joi.string().uri().allow('').optional(),
        website_url: Joi.string().uri().allow('').optional(),
        open_to_relocation: Joi.boolean(),
        open_to_remote_work: Joi.boolean()
    }),
    location: Joi.object({
        city: Joi.string().required(),

        // Only valid if value is contained in countries list
        country: Joi.string().valid(...countriesList)
    }),
    roles: Joi.array().items(Joi.object({
        name: Joi.string()
    }))
})

export default profilePayloadSchema
