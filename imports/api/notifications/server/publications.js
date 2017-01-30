import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Notifications from '../notifications';

Meteor.publish('notifications.list.public', () => {
	// FIX ME publishes public notifications and those a user owns or is subscribed to
	return Notifications.find({ $or: [{ private: false }, { owner: this.userId }, { subscribers: { $in: ["Dg3SaapCuN9BdjLnP"] } }] });
});

Meteor.publish('notifications.view', (_id) => {
	check(_id, String);
	return Notifications.find(_id);
});
