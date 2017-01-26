import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('users.list.public', () => {
	return Meteor.users.find({}, {
		fields: {
			_id: 1,
			emails: 1,
			profile: 1
		}
	});
});

Meteor.publish('Meteor.users.view.public', (_id) => {
	check(_id, String);
	return Meteor.users.find({_id}, {
		fields: {
			_id: 1,
			emails: 1,
			profile: 1
		}
	});
});
