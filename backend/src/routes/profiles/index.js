import { Router } from 'express'
import slugify from 'slugify'
import fetch from 'node-fetch'

import logger from '../../utils/logger'
import gqlClient from '../../gql-client'
import profilePayloadSchema from './profiles.validation'
import { CREATE_PROFILE, PUBLISH_PROFILE } from './profiles.graphql'

const router = new Router()
router.post('/createPublicProfile', async (req, res) => {
    const { profileDetails, roles, location } = req.body.input

    //  Validate input first, in order to return early if invalid
    const { error } = profilePayloadSchema.validate(req.body.input)
    if (error) {
        logger.log({
            level: 'error',
            message: `Payload validation failed: ${error}`
        })
        return res.status(400).json({ message: error })
    }

    // Prepare "roles" to be sent to mutation
    const rolesValues = roles.map((role) => {
        return {
            role: {
                data: {
                    name: role.name,
                    slug: slugify(role.name, {
                        lower: true,
                        remove: /[*+~.()'"!:@]/g
                    })
                },
                on_conflict: {
                    constraint: 'roles_slug_key',
                    update_columns: ['slug']
                }
            }
        }
    })

    // Compose the final payload
    const payload = {
        object: {
            ...profileDetails,
            location: {
                data: {
                    ...location,
                    city_slug: slugify(location.city, {
                        lower: true,
                        remove: /[*+~.()'"!:@]/g
                    })
                },
                on_conflict: {
                    constraint: 'locations_city_slug_key',
                    update_columns: ['city_slug']
                }
            },
            profiles_roles: {
                data: [...rolesValues]
            }
        }
    }

    try {
        const mutation = await gqlClient.request(CREATE_PROFILE, payload)
        const response = mutation.insert_profiles_one

        logger.log({
            level: 'info',
            message: `Profile created: ${response.first_name} ${response.last_name}`
        })

        return res.json({
            first_name: response.first_name,
            last_name: response.last_name
        })
    } catch (err) {
        const isEmailDuplicate = err.response.errors.find((errItem) => errItem.message === 'Uniqueness violation. duplicate key value violates unique constraint "profiles_email_key"')
        if (isEmailDuplicate) {
            logger.log({
                level: 'error',
                message: `Email duplication: ${profileDetails.email}`
            })
            return res.status(400).json({ message: 'Email already exists' })
        }

        logger.log({
            level: 'error',
            message: `Bad request: ${err}`
        })
        return res.status(400).json({ message: 'Some error occured' })
    }
})

router.post('/notify', async (req, res) => {
    const { first_name, last_name, linkedin_url } = req.body.event.data.new
    const url = process.env.SLACK_WEBHOOK_URL

    try {
        const notification = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: `New profile submitted: ${first_name} ${last_name} - ${linkedin_url}`
            })
        })

        if (notification.ok) {
            return res.status(200).json({ message: 'Message sent' })
        }

        logger.log({
            level: 'error',
            message: `Slack response invalid: ${notification.status} - ${notification.statusText}`
        })
        return res.status(400).json({ message: notification })
    } catch (err) {
        logger.log({
            level: 'error',
            message: `Slack network request error: ${err}`
        })
        return res.status(500).json({ message: err })
    }
})

router.post('/publish', async (req, res) => {
    const { id } = req.body.event.data.new

    try {
        const mutation = await gqlClient.request(PUBLISH_PROFILE, {
            id: { _eq: id }
        })

        logger.log({
            level: 'info',
            message: `Profile published: ${id}`
        })

        return res.json(mutation)
    } catch (err) {
        logger.log({
            level: 'error',
            message: `Profile publish error: ${err}`
        })
        return res.status(400).json({ message: err })
    }
})

module.exports = router
