/**
 * DEV: Useful function to fill out the form when developing
 * @param {function} setValue - pass the returning 'setValue' function from the 'useForm' hook
 */

export const fillForm = (setValue) => {
    setValue('input_first_name', 'John', { shouldValidate: true })
    setValue('input_last_name', 'Doe', { shouldValidate: true })
    setValue('input_email', 'john@gmail.com', { shouldValidate: true })
    setValue('input_description', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus imperdiet eleifend tempus. Cras aliquet ultrices ultricies. Aliquam bibendum,', { shouldValidate: true })
    setValue('input_position_title', 'Head of security', { shouldValidate: true })
    setValue('input_linkedin_url', 'https://linkedin.com/sldldsl', { shouldValidate: true })
    setValue('input_resume_url', 'https://resume.com', { shouldValidate: true })
    setValue('input_website_url', 'https://joghn.com', { shouldValidate: true })
    setValue('input_open_to_relocation', true, { shouldValidate: true })
    setValue('input_open_to_remote_work', true, { shouldValidate: true })
    setValue('input_city', 'Bucharest', { shouldValidate: true })
    setValue('input_acceptDataAgreement', true, { shouldValidate: true })
    setValue('input_country', {
        value : 'Romania',
        label : 'Romania'
    }, { shouldValidate: true })
}