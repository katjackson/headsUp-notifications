import React from 'react';
// import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import NotificationSubscriber from '../components/NotificationSubscriber.js';
import NotificationSendButton from '../components/NotificationSendButton.js';
import NotificationEditButtons from '../components/NotificationEditButtons.js';
import SubscribersList from '../components/SubscribersList.js'

const userOwnsNotification = (notification, userId) => {
	return notification.owner === userId;
};

const isUserSubscribed = (notification, userId) => {
	return notification.subscribers.indexOf(userId) >= 0;
}

const ViewNotification = ({ notification, subscribers, owner }) => (
	<div className="ViewNotification">
		<div className="page-header clearfix">
			<h4 className="pull-left">{ notification.content }</h4>
			<p className="by-line"> Created by {owner.profile.name.first} {owner.profile.name.last}</p>
			{ userOwnsNotification(notification, Meteor.userId()) && <NotificationEditButtons notification={ notification }/> }
		</div>
		<div className="action-button-group">
			<NotificationSubscriber notification={ notification }/>
			{ isUserSubscribed(notification, Meteor.userId()) && <NotificationSendButton notification={ notification }/> }
		</div>
		<div className="subscribers-panel">
			<SubscribersList subscribers={ subscribers }/>
		</div>
	</div>
);

ViewNotification.propTypes = {
	notification: React.PropTypes.object.isRequired,
	subscribers: React.PropTypes.array.isRequired
};

export default ViewNotification;
