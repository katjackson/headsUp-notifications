import React from 'react';
import { browserHistory } from 'react-router';
import { Modal, Button } from 'react-bootstrap';

class ConfirmModal extends React.Component {
	render() {
		const { content, onConfirm, onCancel } = this.props;
		return (
			<div className="unsubscribe-modal heads-up-modal">
				<Modal.Dialog>
					<Modal.Body>
						{ content ? content : "Are you sure?" }
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={ () => onConfirm() }>Confirm</Button>
						<Button onClick={ () => onCancel() }>Cancel</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</div>
		);
	};
};

ConfirmModal.propTypes = {
	content: React.PropTypes.string,
	onConfirm: React.PropTypes.func.isRequired,
	onCancel: React.PropTypes.func.isRequired
}

export default ConfirmModal;
