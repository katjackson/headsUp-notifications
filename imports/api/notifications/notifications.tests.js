/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'meteor/practicalmeteor:chai';
import Notifications from './notifications.js';

describe('Notifications collection', function () {
	it('registers the collection with Mongo properly', function () {
		assert.equal(typeof Notifications, 'object');
	});
});
