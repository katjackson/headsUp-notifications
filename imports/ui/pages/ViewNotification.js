import React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeNotification } from '../../api/notifications/methods.js';

const handleEdit = (_id) => {
	browserHistory.push(`/notifications/${_id}/edit`);
}

const handleRemove = (_id) => {
	if (confirm('Are you sure? This is permanent!')) {
		removeNotification.call({ _id }, (error) => {
			if (error) {
				Bert.alert(error.reason, 'danger');
			} else {
				Bert.alert('Notification deleted!', 'success');
				browserHistory.push('/notifications');
			}
		});
	}
};

const ViewNotification = ({ notification }) => (
	<div className="ViewNotification">
		<div className="page-header clearfix">
			<h4 className="pull-left">{ notification.content }</h4>
			<ButtonToolbar className="pull-right">
				<ButtonGroup bsSize="small">
					<Button onClick={ () => handleEdit(notification._id) }>Edit</Button>
					<Button onClick={ () => handleRemove(notification._id) } className="text-danger">Delete</Button>
				</ButtonGroup>
			</ButtonToolbar>
		</div>
		{ notification.body }
	</div>
);

ViewNotification.propTypes = {
	notification: React.PropTypes.object.isRequired,
};

export default ViewNotification;
