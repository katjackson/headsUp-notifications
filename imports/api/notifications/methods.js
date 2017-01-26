import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Notifications from './notifications';
import rateLimit from '../../modules/rate-limit.js';

if (Meteor.isServer) {
	import sendNotificationEmail from '../../modules/server/send-notification-email.js';
};

export const insertNotification = new ValidatedMethod({
	name: 'notifications.insert',
	validate: new SimpleSchema({
		content: { type: String },
		private: { type: Boolean }
	}).validator(),
	run(notification) {
		return Notifications.insert({
			content: notification.content,
			private: notification.private,
			subscribers: [],
			history: [{
				action: "Created",
				timestamp: new Date(),
				user: this.userId
			}],
			owner: this.userId
		});
	},
});

export const updateNotification = new ValidatedMethod({
	name: 'notifications.update',
	validate: new SimpleSchema({
		_id: { type: String },
		content: { type: String },
		private: { type: Boolean }
	}).validator(),
	run(notification) {
		const originalNotification = Notifications.find({_id: notification._id});
		if (notification.content === originalNotification.content && notification.private === originalNotification.private) {
			return notification._id;
		};
		return Notifications.update({ _id: notification._id }, {
			$set: {
				content: notification.content,
				private: notification.private,
			}
		});
	},
});

export const upsertNotification = new ValidatedMethod({
	name: 'notifications.upsert',
	validate: new SimpleSchema({
		content: { type: String },
		subscribers: { type: [String] },
		history: { type: [Object] },
		private: { type: Boolean }
	}).validator(),
	run(notification) {
		return Notifications.upsert({ _id: notification._id }, { $set: notification });
	},
});

export const removeNotification = new ValidatedMethod({
	name: 'notifications.remove',
	validate: new SimpleSchema({
		_id: { type: String },
	}).validator(),
	run({ _id }) {
		Notifications.remove(_id);
	},
});

export const subscribeToNotification = new ValidatedMethod({
	name: 'notifications.subscribe',
	validate: new SimpleSchema({
		_id: { type: String },
		userId: { type: String }
	}).validator(),
	run({ _id, userId }) {
		return Notifications.update(_id, { $addToSet: { subscribers: userId } });
	}
});

export const unsubscribeFromNotification = new ValidatedMethod({
	name: 'notification.unsubscribe',
	validate: new SimpleSchema({
		_id: { type: String },
		userId: { type: String }
	}).validator(),
	run({ _id, userId }) {
		Notifications.update(_id, { $pull: { subscribers: userId } });
	}
});

export const notifySubscribers = new ValidatedMethod({
	name: 'notifications.send',
	validate: new SimpleSchema({
		notification: { type: Object },
		'notification.subscribers': { type: [String] },
		'notification.content': { type: String },
		'notification._id': { type: String },
		'notification.private': { type: Boolean },
		'notification.history': { type: [Object] },
		'notification.owner': { type: String },
		notifierId: { type: String },
		additionalText: { type: String, optional: true }
	}).validator(),
	run({ notification, notifierId, additionalText }) {
		if (Meteor.isServer){
			sendNotificationEmail(notification, notifierId, additionalText)
		}
	}
});

rateLimit({
	methods: [
		upsertNotification,
		removeNotification,
		insertNotification,
		updateNotification,
		subscribeToNotification,
		unsubscribeFromNotification,
		notifySubscribers
	],
	limit: 5,
	timeRange: 1000,
});
