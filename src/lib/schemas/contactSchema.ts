import * as yup from 'yup';

export const contactSchema = yup.object().shape({
	subject: yup
		.string()
		.max(100, 'The subject may not exceed 100 characters.')
		.required('Subject is required'),
	email: yup
		.string()
		.email('This is no valid email address.')
		.required('Please provide a valid email address.'),
	message: yup
		.string()
		.max(200000, 'The message may not exceed 200.000 characters.')
		.required('Message is required.')
});
