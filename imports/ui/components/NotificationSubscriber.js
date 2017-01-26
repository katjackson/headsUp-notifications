import React from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { removeNotification, subscribeToNotification, unsubscribeFromNotification } from '../../api/notifications/methods.js';

const handleSubscribe = (_id, userId) => {
	if (Meteor.user() === null || Meteor.user() === undefined) {
		Bert.alert ('You must be logged in to watch this notification.', 'info')
	} else {
		subscribeToNotification.call({ _id, userId }, (error) => {
			if (error) {
				Bert.alert(error.reason, 'danger');
			} else {
				Bert.alert('You are now subscribed!', 'success');
			}
		});
	};
};

const handleUnsubscribe = (_id, userId) => {
	unsubscribeFromNotification.call({ _id, userId }, (error) => {
		if (error) {
			Bert.alert(error.reason, 'danger');
		} else {
			Bert.alert('You are now unsubscribed!', 'success');
		}
	});
};

const isUserSubscribed = (notification, userId) => {
	return notification.subscribers.indexOf(userId) >= 0;
}

export default class NotificationSubscriber extends React.Component {
		render() {
		const { notification } = this.props;

		if (isUserSubscribed(notification, Meteor.userId())) {
			return (<Button onClick={ () => handleUnsubscribe(notification._id, Meteor.userId()) }>Unsubscribe</Button>);
		} else {
			return (<Button onClick={ () => handleSubscribe(notification._id, Meteor.userId()) }>Subscribe</Button>);
		}
	};
};
