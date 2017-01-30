import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { removeNotification } from '../../api/notifications/methods.js';

const handleEdit = (_id) => {
	browserHistory.push(`/notifications/${_id}/edit`);
}

const handleRemove = (_id) => {
	if (confirm('Are you sure? This is permanent!')) {
		browserHistory.push('/notifications');
		removeNotification.call({ _id }, (error) => {
			if (error) {
				Bert.alert(error.reason, 'danger');
				browserHistory.push(`/notifications/${_id}/edit`);
			} else {
				Bert.alert('Notification deleted!', 'success');
			}
		});
	}
};

export default class NotificationEditButtons extends React.Component {
		render() {
		const { notification } = this.props;

		return (
			<ButtonToolbar className="pull-right">
				<ButtonGroup bsSize="small">
					<Button onClick={ () => handleEdit(notification._id) }>Edit</Button>
					<Button onClick={ () => handleRemove(notification._id) } className="text-danger">Delete</Button>
				</ButtonGroup>
			</ButtonToolbar>
		);
	};
};
