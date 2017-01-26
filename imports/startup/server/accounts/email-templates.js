import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

const name = 'Kat';
const email = '<support@heads-up.com>';
const from = `${name} ${email}`;
const emailTemplates = Accounts.emailTemplates;

emailTemplates.siteName = name;
emailTemplates.from = from;

emailTemplates.resetPassword = {
	subject() {
		return `[${name}] Reset Your Password`;
	},
	text(user, url) {
		const userEmail = user.emails[0].address;
		const urlWithoutHash = url.replace('#/', '');

		return `A password reset has been requested for the account related to this ` +
		`address (${userEmail}). To reset the password, visit the following link: ` +
		`\n${urlWithoutHash}\n\nIf you did not request this reset, please ignore ` +
		`this email. If you feel something is wrong, please contact our support team: `+
		`${email}.`;
	},
};

emailTemplates.spreadTheWord = {
	subject(notification) {
		return `HeadsUp - ${notification.content}`
	},
	text(userFirstName, notification, notifierName, additionalText) {
		const unsubscribeUrl = Meteor.absoluteUrl(`notifications/${notification._id}`)

		return `Hey ${userFirstName},\n${notification.content}\n${additionalText}\n` +
		`—${notifierName}\nYou are subscribed to this notification through HeadsUp.\n` +
		`Unsubscribe here: <${unsubscribeUrl}>. Spread the word: <${Meteor.absoluteUrl()}>.\n` +
		`Do not reply to this email.`
	}
}
