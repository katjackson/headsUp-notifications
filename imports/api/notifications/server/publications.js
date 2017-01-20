import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Notifications from '../notifications';

Meteor.publish('notifications.list', () => Notifications.find());

Meteor.publish('notifications.view', (_id) => {
	check(_id, String);
	return Notifications.find(_id);
});
