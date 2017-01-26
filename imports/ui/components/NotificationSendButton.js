import React from 'react';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { notifySubscribers } from '../../api/notifications/methods.js';

const handleNotify = (notification, notifierId, additionalText) => {
	notifySubscribers.call({ notification, notifierId, additionalText }, (error) => {
		if (error) {
			console.error(error);
			Bert.alert(error.reason);
		} else {
			Bert.alert('Message sent!', 'success');
		}
	});
};

const isUserSubscribed = (notification, userId) => {
	return notification.subscribers.indexOf(userId) >= 0;
};


export default class NotificationSendButton extends React.Component {
		render() {
		const { notification } = this.props;

		return (
			<Button onClick={ () => handleNotify(notification, Meteor.userId()) } className="pull-right">Spread the word</Button>
		);
	};
};
