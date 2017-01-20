/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import notificationEditor from '../../modules/notification-editor.js';

export default class NotificationEditor extends React.Component {
	componentDidMount() {
		notificationEditor({ component: this });
		setTimeout(() => { document.querySelector('[name="content"]').focus(); }, 0);
	}

	render() {
		const { notification } = this.props;
		return (<form
			ref={ form => (this.notificationEditorForm = form) }
			onSubmit={ event => event.preventDefault() }
		>
			<FormGroup>
				<ControlLabel>Content</ControlLabel>
				<FormControl
					type="text"
					name="content"
					defaultValue={ notification && notification.content }
					placeholder="What's happening?"
				/>
			</FormGroup>
			<FormGroup>
				<ControlLabel>Private</ControlLabel>
				<input
					type="checkbox"
					name="private"
					defaultChecked={ notification ? notification.private : false }
				/>
			</FormGroup>
			<Button type="submit" bsStyle="success">
				{ notification && notification._id ? 'Save Changes' : 'Add Notification' }
			</Button>
		</form>);
	}
}

notificationEditor.propTypes = {
	notification: React.PropTypes.object,
};
