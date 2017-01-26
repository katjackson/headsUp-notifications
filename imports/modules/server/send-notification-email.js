import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';

const notificationEmailTemplate = Accounts.emailTemplates.spreadTheWord;
const notificationEmailFrom = 'notifications@heads-up.com';

const getRecipients = (notification, notifierId) => {
	const recipients = Meteor.users.find({ _id: { $in: notification.subscribers } }).fetch()
	return recipients.filter( (user) =>
		(user.emails[0].address !== null) && (user.emails[0].address !== undefined)
	)
};

export default function sendNotificationEmail(notification, notifierId, additionalText) {
	const notifier = Meteor.users.findOne({ _id: notifierId })
	if (notifier === null || notifier === undefined) throw new Error("Cannot find notifying user")
	const notifierName = notifier.profile.name.first + ' ' + notifier.profile.name.last

	const recipients = getRecipients(notification, notifierId)
	if (!recipients.length) throw new Error("Error retrieving subscribers")

	recipients.forEach( (recipient) => {
		let userFirstName = recipient.profile.name.first
		Email.send({
			to: recipient.emails[0].address,
			from: `${notifierName} <${notificationEmailFrom}>`,
			subject: notificationEmailTemplate.subject(notification),
			text: notificationEmailTemplate.text(userFirstName, notification, notifierName, additionalText),
			headers: Accounts.emailTemplates.headers
		});
	});
}
