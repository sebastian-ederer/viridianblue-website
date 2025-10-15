import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';

import { EMAIL_USER, EMAIL_PASS } from '$env/static/private';
import { contactSchema } from '$lib/schemas/contactSchema';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') || '');
		const subject = String(formData.get('subject') || '');
		const message = String(formData.get('message') || '');
		const cleanMessage = sanitizeHtml(message);

		let errors: { [key: string]: Array<string> } = {};

		await contactSchema
			.validate({ subject, email: email, message: cleanMessage }, { abortEarly: false })
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

		// Construct the email
		const mailOptions = {
			from: email,
			to: EMAIL_USER,
			replyTo: String(email),
			subject: subject,
			html: `
				<div style="font-family: sans-serif; font-size: 16px; color: #333;">
					${cleanMessage}
					<hr style="margin-top: 2em; border: none; border-top: 1px solid #ccc;" />
					<p><strong>Sender:</strong> ${email}</p>
				</div>
			`
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
			console.error('Email send failed:', error);
			return fail(500, { success: false, error: 'Internal server error' });
		}
	}
} satisfies Actions;
