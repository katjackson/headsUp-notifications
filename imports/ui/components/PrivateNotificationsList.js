import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const handleNav = (_id) => {
	browserHistory.push(`/notifications/${_id}`);
};

const PrivateNotificationsList = ({ privateNotifications }) => (
	<div className="private-notifications-panel">
		<div className="page-header clearfix">
			<h4 className="pull-left">Your Private Notifications</h4>
		</div>
		<ListGroup className="PrivateNotificationsList">
			{privateNotifications.map(({ _id, content }) => (
				<ListGroupItem key={ _id } onClick={ () => handleNav(_id) }>
					{ content }
				</ListGroupItem>
			))}
		</ListGroup>
	</div>
);


PrivateNotificationsList.propTypes = {
	privateNotifications: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default PrivateNotificationsList;
