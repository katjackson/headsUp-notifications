import React from 'react';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';

const SubscribersList = ({ subscribers }) => (
	subscribers.length > 0 ? <ListGroup className="SubscribersList">
		{subscribers.map(({ _id, profile }) => (
			<ListGroupItem key={ _id }>
				{ profile.name.first } { profile.name.last }
			</ListGroupItem>
		))}
	</ListGroup> :
	<Alert bsStyle="warning">No subscriptions yet.</Alert>
);

SubscribersList.propTypes = {
	subscribers: React.PropTypes.array,
};

export default SubscribersList;
