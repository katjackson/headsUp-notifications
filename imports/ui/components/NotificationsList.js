import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';

const handleNav = (_id) => {
	browserHistory.push(`/notifications/${_id}`);
}

const NotificationsList = ({ notifications }) => (
	notifications.length > 0 ? <ListGroup className="NotificationsList">
		{notifications.map(({ _id, content }) => (
			<ListGroupItem key={ _id } onClick={ () => handleNav(_id) }>
				{ content }
			</ListGroupItem>
		))}
	</ListGroup> :
	<Alert bsStyle="warning">No notifications yet.</Alert>
);

NotificationsList.propTypes = {
	notifications: React.PropTypes.array,
};

export default NotificationsList;
