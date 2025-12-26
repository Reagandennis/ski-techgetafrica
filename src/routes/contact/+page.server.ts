import { fail, type Actions } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const name = form.get('name') as string;
		const email = form.get('email') as string;
		const subject = form.get('subject') as string;
		const message = form.get('message') as string;

		if (!name || !email || !subject || !message) {
			return fail(400, {
				error: 'Please fill out all fields.',
				data: Object.fromEntries(form.entries()),
			});
		}

		try {
			await resend.emails.send({
				from: 'Contact Form <onboarding@resend.dev>',
				to: 'reaganenochowiti@techgetafrica.com',
				subject: `New Contact Form Submission: ${subject}`,
				html: `
					<p>You have a new contact form submission from:</p>
					<ul>
						<li><strong>Name:</strong> ${name}</li>
						<li><strong>Email:</strong> ${email}</li>
					</ul>
					<hr>
					<p><strong>Message:</strong></p>
					<p>${message}</p>
				`,
			});

			return { success: true };
		} catch (error) {
			console.error('Error sending email:', error);
			return fail(500, {
				error: 'There was a problem sending your message. Please try again later.',
			});
		}
	},
};
