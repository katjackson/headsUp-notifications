import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { unsubscribeFromNotification } from '../../api/notifications/methods.js';
import ConfirmModal from '../components/ConfirmModal.js'

const handleUnsubscribe = (_id, userId) => {
	unsubscribeFromNotification.call({ _id, userId }, (error) => {
		if (error) {
			Bert.alert(error.reason, 'danger');
		} else {
			Bert.alert('You are now unsubscribed!', 'success');
			browserHistory.push('/notifications/');
		}
	});
};

const handleNav = (_id) => {
	browserHistory.push(`/notifications/${_id}`);
};

const UnsubscribeNotification = ({ notification }) => (
	<ConfirmModal content={`Are you sure you want to unsubscribe from ${notification.content}?`}
		onConfirm={ handleUnsubscribe.bind(this, notification._id, Meteor.userId()) }
		onCancel={ handleNav.bind(this, notification._id) }
	/>
)

UnsubscribeNotification.propTypes = {
	notification: React.PropTypes.object.isRequired,
};

export default UnsubscribeNotification;
