import React, {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers'
import { useQuery, gql, useMutation } from '@apollo/client'
import styled from 'styled-components'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import {Checkmark} from '@styled-icons/ionicons-solid/Checkmark'

import {theme, device} from '../config/theme'
import { Button, CheckBox } from '../components/common'
import ProfileCard from '../components/ProfileCard'
import countriesList from '../components/registrationForm/countries-list'
import profileFormSchema from '../components/registrationForm/form-validation'

import settings from '../config/settings.json'


const FETCH_FORM_FILTERS_VALUES = gql`
    query fetchFormFiltersValue {
        roles(order_by: {name: asc}) {
            id
            name
            slug
        }
    }
`

const SUBMIT_PROFILE= gql`
    mutation submitProfile($profileDetails: CreatePublicProfileInput!,$location: PublicLocation, $roles: [PublicRole!]!) {
        createPublicProfile(profileDetails: $profileDetails, roles: $roles, location: $location) {
            first_name
            last_name
        }
    }
`



const RegisterPage = () => {
    const [previewData, setPreviewData] = useState(false)
    // Use a ref, the countries list does not change for the whole lifecycle
    const rolesListRef = useRef([])

    // Fetch items for existing roles
    const { 
        loading: rolesLoading,
        data: rolesItems 
    } = useQuery(FETCH_FORM_FILTERS_VALUES)


    // Mutation to be triggered on submit
    const [ addProfile, {
        loading: createProfileLoading,
        data: createdProfile
    }] = useMutation(SUBMIT_PROFILE, {errorPolicy: 'all'})

    // The form controls with own resolver for valiation
    const { register, control, handleSubmit, errors, setError } = useForm({
        resolver: joiResolver(profileFormSchema),
    })

    if (rolesLoading) return <p>Loading...</p>

    // Map response to react-select component input format, when response is ready
    rolesListRef.current = rolesItems.roles.map(role => {
        return {
            value : role.id,
            label : role.name
        }
    })

    // Form submit - called only when form validation passes
    // TODO: normalize object structure between preview, payload and validation
    const onSubmit = async (data) => {
        try {
            const profile = await addProfile({
                variables : {
                    profileDetails: {
                        first_name: data.input_first_name,
                        last_name: data.input_last_name,
                        email: data.input_email,
                        description: data.input_description,
                        position_title: data.input_position_title,
                        linkedin_url: data.input_linkedin_url,
                        resume_url: data.input_resume_url,
                        website_url: data.input_website_url,
                        open_to_relocation: data.input_open_to_relocation,
                        open_to_remote_work: data.input_open_to_remote_work
                    },
                    location: {
                        city: data.input_city,
                        country: data.input_country.value
                    },
                    roles: data.input_roles.map(role => {
                        return {
                            name : role.label
                        }
                    })
                }
            })

            if(profile.errors) {

                // Handle email duplication error
                const isEmailDuplicated = profile.errors.find(errItem => errItem.message === 'Email already exists')
                if(isEmailDuplicated) {
                    setError('input_email', {
                        message: isEmailDuplicated.message
                    })
                }
            } else {
                setPreviewData({
                    first_name: data.input_first_name,
                    last_name: data.input_last_name,
                    email: data.input_email,
                    description: data.input_description,
                    position_title: data.input_position_title,
                    linkedin_url: data.input_linkedin_url,
                    resume_url: data.input_resume_url,
                    website_url: data.input_website_url,
                    open_to_relocation: data.input_open_to_relocation,
                    open_to_remote_work: data.input_open_to_remote_work,
                    location: {
                        city: data.input_city,
                        country: data.input_country.value
                    },
                    profiles_roles: data.input_roles.map(role => {
                        return {
                            role : {
                                name : role.label,
                                id : role.value
                            }
                        }
                    })
                })
            }
        } catch(err) {
            console.log(err)
            return null
        }        
    }


    return <div>
        <Wrapper>
            {!createdProfile &&
                <div>
                    <h1>{settings.register.title}</h1>
                    <p>{settings.register.description}</p>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Title>Personal and Location Details</Title>
                        <FormRow>
                            <StyledInput hasError={errors.input_first_name}>
                                <input type="text" name="input_first_name" placeholder="First Name" ref={register} />
                            </StyledInput>

                            <StyledInput hasError={errors.input_last_name}>
                                <input type="text" name="input_last_name" placeholder="Last Name" ref={register} />
                            </StyledInput>
                        </FormRow>

                        <FormRow>
                            <StyledInput hasError={errors.input_description}>
                                <textarea name="input_description" placeholder="Short bio or personal summary" ref={register} />
                            </StyledInput>
                        </FormRow>

                        <FormRow>
                            <StyledInput hasError={errors.input_city}>
                                <input type="text" name="input_city" placeholder="Current City" ref={register({ required: true })} />
                            </StyledInput>

                            <StyledSelect hasError={errors.input_country}>
                                <Controller
                                    name="input_country"
                                    defaultValue={null}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ onChange, value }) => {
                                        return <Select
                                            placeholder="Country"
                                            value={value}
                                            options={countriesList}
                                            onChange={(selection) => onChange(selection)}
                                        />
                                    }}
                                />
                            </StyledSelect>
                        </FormRow>

                        <FormRow>
                            <CheckBox>
                                <input
                                    name="input_open_to_relocation"
                                    type="checkbox"
                                    ref={register}
                                />
                                <span>I am open to relocation</span>
                            </CheckBox>
                        </FormRow>

                        <FormRow>
                            <CheckBox>
                                <input
                                    name="input_open_to_remote_work"
                                    type="checkbox"
                                    ref={register}
                                />
                                <span>I am open to remote work</span>
                            </CheckBox>
                        </FormRow>

                        <RowSeparator />

                        <Title>Professional Information</Title>

                        <FormRow>
                            <StyledInput hasError={errors.input_position_title}>
                                <input type="text" name="input_position_title" placeholder="Most Recent Job Title" ref={register({required:true})} />
                            </StyledInput>
                        
                            <StyledSelect hasError={errors.input_roles}>
                                <Controller
                                    name="input_roles"
                                    control={control}
                                    defaultValue={null}
                                    rules={{ required: true }}
                                    render={({onChange, value}) => {
                                        return <CreatableSelect
                                            placeholder="Select one or more departments"
                                            isMulti
                                            value={value}
                                            options={rolesListRef.current}
                                            onChange={(selection) => onChange(selection)}
                                        />
                                    }}
                                />
                            </StyledSelect>                    
                        </FormRow>

                        <RowSeparator />

                        <Title>Contact Details</Title>

                        <FormRow>
                            <StyledInput hasError={errors.input_email}>
                                <input type="email" name="input_email" placeholder="Email" ref={register} />
                                {errors.input_email && errors.input_email.message === 'Email already exists' && 
                                    <ErrorIndicator>A profile has already been registered with this email address</ErrorIndicator>
                                }
                            </StyledInput>
                            <StyledInput hasError={errors.input_linkedin_url}>
                                <input type="text" name="input_linkedin_url" placeholder="Linkedin Profile Link" ref={register({ required: true })} />
                            </StyledInput>
                        </FormRow>

                        
                        <FormRow>
                            <StyledInput>
                                <input type="text" name="input_resume_url" placeholder="Personal CV Link" ref={register} />
                            </StyledInput>
                            <StyledInput>
                                <input type="text" name="input_website_url" placeholder="Personal/Other Website Link" ref={register} />
                            </StyledInput>
                        </FormRow>
                        
                        <RowSeparator/>

                        <FormRow>
                            <CheckBox hasError={errors.input_acceptDataAgreement}>
                                <input
                                    name="input_acceptDataAgreement"
                                    type="checkbox"
                                    ref={register({required:true})}
                                />
                                <span>I have read and agree with the <Link to="/privacy">Data Privacy Policy</Link></span>
                            </CheckBox>
                        </FormRow>

                        <RowSeparator/>

                        <Button type="submit" disabled={createProfileLoading}>Submit</Button>
                    </form>
                </div>
            }

            {createdProfile && 
                <Overlay>
                    <Message>
                        <Checkmark/>
                        <h2>Thank you for registering!</h2>
                        <p>We'll review and publish your profile shortly -- expect a confirmation email then.</p>
                        <br />
                        <p>Below is a preview of how your profile will look once published:</p>
                    </Message>
                    
                    {previewData && 
                        <PreviewArea>
                            <ProfileCard data={previewData} hideShareButton={true}/>
                        </PreviewArea>
                    }
                </Overlay>
            }
        </Wrapper>

    </div>
}

const Wrapper = styled.div`
    position:relative;
    padding-bottom:50px;

    @media ${device.laptop} {
        width:60%;
        margin:0 auto;
    }
`

const PreviewArea = styled.div`
    @media ${device.tablet} {
        width:50vw;
    }

    @media ${device.laptop} {
        width:25vw;
    }
`

const Title = styled.h2`
    font-weight:normal;
    margin-top:${theme.spacing._30};
`

const ErrorIndicator = styled.span`
    color:red;
    font-size:${theme.fonts.sizes.small};
`

const Message = styled.div`
    margin:50px 0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    > p {
        margin:0;
        text-align:center;
        font-size: ${theme.fonts.sizes.increased};
    }

    > svg {
        width:60px;
        height:60px;
        color:${theme.colors.main};
    }
`

const Overlay = styled.div`
    background:white;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const FormRow = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    margin-bottom:10px;

    @media ${device.laptop} {
        flex-direction:row;
        margin-bottom:20px;
    }
`

const StyledInput = styled.div`
    flex: 1 1 0;
    margin-bottom:10px;
    

    input[type="text"], input[type="email"], textarea, input[type="checkbox"] {
        display:block;
        padding: 2px 8px;
        min-height:38px;
        border-radius: 4px;
        border:${({hasError}) => hasError ? '1px solid red' : '1px solid hsl(0,0%,80%)'};
        color:hsl(0,0%,20%);
        font-size:16px;
        font-family:${theme.fonts.families.main};
        transition:border 0.2s ease-in-out;
        width:100%;

        &:focus {
            outline:none;
            box-shadow:${({hasError}) => hasError ? '0 0 5px red' : '0 0 5px ' + theme.colors.main};
        }
    }

    textarea {
        resize:none;
        width:100%;
        min-height:70px;
        padding:5px 8px;
    }

    @media ${device.laptop} {
        padding-right:20px;
        margin:0;
    }
`

const StyledSelect = styled.div`
    flex: 1 1 0;
    display:block;

    > div  {
        width:100%;

        > div {
            border-color:${({hasError}) => hasError ? 'red' : 'hsl(0,0%,80%)'};
        }
    }
    
    @media ${device.laptop} {
        padding-right:20px;
    }
`

const RowSeparator = styled.hr`
    display:block;
    border: 0;
    
    @media ${device.laptop} {
        margin:20px 0;
        height:1px;
    }
`


export default RegisterPage
