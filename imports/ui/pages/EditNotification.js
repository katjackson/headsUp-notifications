import React from 'react';
import NotificationEditor from '../components/NotificationEditor.js';

const EditNotification = ({ notification }) => (
	<div className="EditNotification">
		<h4 className="page-header">Edit Notification</h4>
		<NotificationEditor notification={ notification } />
	</div>
);

EditNotification.propTypes = {
	notification: React.PropTypes.object,
};

export default EditNotification;
