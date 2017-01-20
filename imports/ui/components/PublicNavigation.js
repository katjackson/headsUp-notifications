import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
	<div>
		<Nav>
			<LinkContainer to="/notifications">
				<NavItem eventKey={ 1 } href="/notifications">Notifications</NavItem>
			</LinkContainer>
		</Nav>
		<Nav pullRight>
			<LinkContainer to="signup">
				<NavItem eventKey={ 2 } href="/signup">Sign Up</NavItem>
			</LinkContainer>
			<LinkContainer to="login">
				<NavItem eventKey={ 3 } href="/login">Log In</NavItem>
			</LinkContainer>
		</Nav>
	</div>
);

export default PublicNavigation;
