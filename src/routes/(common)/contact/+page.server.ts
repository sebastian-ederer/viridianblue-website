import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

import { EMAIL_USER, EMAIL_PASS } from '$env/static/private';
import { contactSchema } from '$lib/schemas/contactSchema';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const subject = formData.get('subject');
		const message = formData.get('message');

		let errors: { [key: string]: Array<string> } = {};

		await contactSchema
			.validate({ subject, email: email, message }, { abortEarly: false })
			.catch((error) => {
				for (let i = 0; i < error.inner.length; i++) {
					const key = error.inner[i].path as keyof typeof errors;
					errors[key] = error.inner[i].errors;
				}
			});

		if (Object.keys(errors).length > 0) {
			return fail(400, errors);
		}

		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: EMAIL_USER,
				pass: EMAIL_PASS
			}
		});

		transporter.verify(function (error: any) {
			if (error) {
				console.error(error);
			} else {
				console.log('Server is ready to take our messages');
			}
		});

		// Construct the email
		const mailOptions = {
			from: email,
			to: EMAIL_USER,
			replyTo: String(email),
			subject: subject,
			text: `${message} \n\n---\n\nSent by: ${email}`
		};

		const sendEmail = async (email: any) => {
			await new Promise((resolve, reject) => {
				transporter.sendMail(email, (err: any, info: unknown) => {
					if (err) {
						console.error(err);
						reject(err);
					} else {
						resolve(info);
					}
				});
			});
		};

		try {
			await sendEmail(mailOptions);
			return { success: true };
		} catch (error) {
			return fail(500, { success: false, error });
		}
	}
} satisfies Actions;
