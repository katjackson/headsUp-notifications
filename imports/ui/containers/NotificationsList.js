import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Notifications from '../../api/notifications/notifications.js';
import NotificationsList from '../components/NotificationsList.js';
import Loading from '../components/Loading.js';

const composer = (params, onData) => {
	const subscription = Meteor.subscribe('notifications.list.public');
	if (subscription.ready()) {
		const notifications = Notifications.find({private: false}).fetch();
		onData(null, { notifications });
	}
};

export default composeWithTracker(composer, Loading)(NotificationsList);
