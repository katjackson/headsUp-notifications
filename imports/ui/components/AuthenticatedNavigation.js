import React from 'react';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
	const user = Meteor.user();
	const name = user && user.profile ? user.profile.name : '';
	return user ? `${name.first} ${name.last}` : '';
};

const AuthenticatedNavigation = () => (
	<div>
		<Nav>
			<LinkContainer to="/documents">
				<NavItem eventKey={ 2 } href="/documents">Documents</NavItem>
			</LinkContainer>
		</Nav>
		<Nav>
			<LinkContainer to="/notifications">
				<NavItem eventKey={ 3 } href="/notifications">Notifications</NavItem>
			</LinkContainer>
		</Nav>
		<Nav pullRight>
			<NavDropdown eventKey={ 4 } title={ userName() } id="basic-nav-dropdown">
				<MenuItem eventKey={ 4.1 } onClick={ handleLogout }>Logout</MenuItem>
			</NavDropdown>
		</Nav>
	</div>
);

export default AuthenticatedNavigation;
