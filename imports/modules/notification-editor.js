/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { updateNotification, insertNotification } from '../api/notifications/methods.js';
import './validation.js';

let component;

const handleUpdate = () => {
	const { notification } = component.props;
	const confirmation = 'Notification updated!';
	const updatedNotification = {
		content: document.querySelector('[name="content"]').value.trim(),
		private: document.querySelector('[name="private"]').checked,
	};

	updatedNotification._id = notification._id;

	updateNotification.call(updatedNotification, (error, response) => {
		if (error) {
			console.error(error)
			Bert.alert(error.reason, 'danger');
		} else {
			component.notificationEditorForm.reset();
			Bert.alert(confirmation, 'success');
			browserHistory.push(`/notifications/${response || notification._id}`);
		}
	});
};

const handleInsert = () => {
	const { notification } = component.props;
	const confirmation = 'Notification added!';
	const newNotification = {
		content: document.querySelector('[name="content"]').value.trim(),
		private: document.querySelector('[name="private"]').checked,
	};
	insertNotification.call(newNotification, (error, response) => {
		if (error) {
			console.error(error)
			Bert.alert(error.reason, 'danger');
		} else {
			component.notificationEditorForm.reset();
			Bert.alert(confirmation, 'success');
			browserHistory.push(`/notifications/${response}`);
		}
	});
};

const validate = () => {
	$(component.notificationEditorForm).validate({
		rules: {
			content: { required: true },
			private: { required: false }
		},
		messages: {
			title: {required: 'Your notification needs content.'},
		},
		submitHandler() {
			if (component.props.notification) handleUpdate();
			else handleInsert();
		},
	});
};

export default function notificationEditor(options) {
	component = options.component;
	validate();
}
