import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Notifications from '../../api/notifications/notifications.js';
import ViewNotification from '../pages/ViewNotification.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
	const subscription = Meteor.subscribe('notifications.view', params._id);

	if (subscription.ready()) {
		const notification = Notifications.findOne();
		onData(null, { notification });
	}
};

export default composeWithTracker(composer, Loading)(ViewNotification);
