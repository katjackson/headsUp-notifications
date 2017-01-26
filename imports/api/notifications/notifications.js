import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor';

const Notifications = new Mongo.Collection('notifications');
export default Notifications;

Notifications.allow({
	insert: () => false,
	update: () => false,
	remove: () => false,
});

Notifications.deny({
	insert: () => true,
	update: () => true,
	remove: () => true,
});

Notifications.schema = new SimpleSchema({
	content: {
		type: String,
		label: 'What happened',
	},
	subscribers: {
		type: [String],
		label: 'Who want to know',
	},
	history: {
		type: [Object],
		label: 'Who spread it and when',
	},
	"history.$.action": { type: String },
	"history.$.user": { type: String },
	"history.$.timestamp": { type: Date },
	private: {
		type: Boolean,
		label: 'Invite only?',
		defaultValue: false
	},
	owner: {
		type: String,
		defaultValue: this.userId
	}
});

Notifications.attachSchema(Notifications.schema);

Factory.define('notification', Notifications, {
	content: () => 'Factory Content',
	subscribers: () => 'Factory Subscribers',
	history: () => 'Factory History',
});
