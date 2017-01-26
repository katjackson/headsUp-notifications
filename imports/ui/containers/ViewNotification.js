import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Notifications from '../../api/notifications/notifications.js';
import ViewNotification from '../pages/ViewNotification.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
	const notificationsSubscription = Meteor.subscribe('notifications.view', params._id);
	const usersSubscription = Meteor.subscribe('users.list.public');

	if (notificationsSubscription.ready() && usersSubscription.ready()) {
		const notification = Notifications.findOne();
		const subscribers = Meteor.users.find({ _id: { $in: notification.subscribers } }).fetch();
		const owner = Meteor.users.findOne({ _id: notification.owner })
		onData(null, { notification, subscribers, owner });
	}
};

export default composeWithTracker(composer, Loading)(ViewNotification);
