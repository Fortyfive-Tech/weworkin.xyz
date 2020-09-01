import Joi from '@hapi/joi'
import countriesList from './countries-list'

const profileFormSchema = Joi.object({
    input_first_name: Joi.string().required(),
    input_last_name: Joi.string().required(),
    input_email: Joi.string().email({ tlds: {allow: false} }).required(),
    input_description: Joi.string().max(350),
    input_position_title: Joi.string().max(40),
    input_linkedin_url: Joi.string().uri().required(),
    input_resume_url: Joi.string().uri().allow('').optional(),
    input_website_url: Joi.string().uri().allow('').optional(),
    input_open_to_relocation: Joi.boolean(),
    input_open_to_remote_work: Joi.boolean(),
    input_city: Joi.string().required(),

    // Only valid if value is contained in countries list
    input_country: Joi.string().valid(...countriesList),
    input_acceptDataAgreement: Joi.boolean().invalid(false),
    input_roles: Joi.array().items(Joi.object({
        value: Joi.any().optional(),
        label: Joi.string(),
        __isNew__: Joi.boolean().optional()
    }))
})

export default profileFormSchema