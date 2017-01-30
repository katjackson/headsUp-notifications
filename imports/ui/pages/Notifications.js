import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Row, Col, Button } from 'react-bootstrap';
import NotificationsList from '../containers/NotificationsList.js';
import PrivateNotificationsList from '../containers/PrivateNotificationsList.js'

const Notifications = () => (
	<div className="Notifications">
		<Row>
			<Col xs={ 12 }>
				<div className="page-header clearfix">
					<h4 className="pull-left">Notifications</h4>
					<Link to="/notifications/new">
						<Button
							bsStyle="success"
							className="pull-right"
						>New Notification</Button>
					</Link>
				</div>
				<NotificationsList />
			</Col>
			<Col xs={ 12 }>
				<PrivateNotificationsList />
			</Col>
		</Row>
	</div>
);

export default Notifications;
