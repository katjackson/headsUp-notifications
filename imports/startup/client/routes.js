/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.js';
import Notifications from '../../ui/pages/Notifications.js'
import NewNotification from '../../ui/pages/NewNotification.js';
import EditNotification from '../../ui/containers/EditNotification.js';
import ViewNotification from '../../ui/containers/ViewNotification.js';
import Documents from '../../ui/pages/Documents.js';
import NewDocument from '../../ui/pages/NewDocument.js';
import EditDocument from '../../ui/containers/EditDocument.js';
import ViewDocument from '../../ui/containers/ViewDocument.js';
import Index from '../../ui/pages/Index.js';
import Login from '../../ui/pages/Login.js';
import NotFound from '../../ui/pages/NotFound.js';
import RecoverPassword from '../../ui/pages/RecoverPassword.js';
import ResetPassword from '../../ui/pages/ResetPassword.js';
import Signup from '../../ui/pages/Signup.js';

const authenticate = (nextState, replace) => {
	if (!Meteor.loggingIn() && !Meteor.userId()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname },
		});
	}
};

Meteor.startup(() => {
	render(
		<Router history={ browserHistory }>
			<Route path="/" component={ App }>
				<IndexRoute name="index" component={ Index } />
				<Route name="notifications" path="/notifications" component={ Notifications } />
				<Route name="newNotification" path="/notifications/new" component={ NewNotification } onEnter={ authenticate } />
				<Route name="editNotification" path="/notifications/:_id/edit" component={ EditNotification } onEnter={ authenticate } />
				<Route name="viewNotification" path="/notifications/:_id" component={ ViewNotification } />
				<Route name="documents" path="/documents" component={ Documents } onEnter={ authenticate } />
				<Route name="newDocument" path="/documents/new" component={ NewDocument } onEnter={ authenticate } />
				<Route name="editDocument" path="/documents/:_id/edit" component={ EditDocument } onEnter={ authenticate } />
				<Route name="viewDocument" path="/documents/:_id" component={ ViewDocument } onEnter={ authenticate } />
				<Route name="login" path="/login" component={ Login } />
				<Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
				<Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
				<Route name="signup" path="/signup" component={ Signup } />
				<Route path="*" component={ NotFound } />
			</Route>
		</Router>,
		document.getElementById('react-root')
	);
});
