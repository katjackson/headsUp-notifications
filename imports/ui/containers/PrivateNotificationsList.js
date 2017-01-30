import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Notifications from '../../api/notifications/notifications.js';
import PrivateNotificationsList from '../components/PrivateNotificationsList.js';
import Loading from '../components/Loading.js';

const composer = (params, onData) => {
	const subscription = Meteor.subscribe('notifications.list.public');
	if (subscription.ready()) {
		const privateNotifications = Notifications.find({private: true}).fetch();
		console.log(Notifications.find().fetch());
		onData(null, { privateNotifications });
	}
};

export default composeWithTracker(composer, Loading)(PrivateNotificationsList);
