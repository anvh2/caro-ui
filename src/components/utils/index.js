/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { ButtonGroup, Button, Modal } from 'react-bootstrap';
import { sendUndoAction } from '../../plugins/socket';
import '../../App.css';

export const ChooseGameBtnGroup = gameOnlineClick => {
  return (
    <ButtonGroup aria-label="Basic Button Group">
      <Button
        variant="outline-secondary"
        type="button"
        onClick={gameOnlineClick}
      >
        Online
      </Button>
      <Button variant="outline-secondary">Offline</Button>
    </ButtonGroup>
  );
};

export const GameOnlineBtnGroup = () => {
  return (
    <ButtonGroup aria-label="Basic Button Group">
      <Button
        variant="outline-secondary"
        type="button"
        onClick={() => {
          console.log('surrender');
        }}
      >
        Surrender
      </Button>
      <Button
        variant="outline-secondary"
        onClick={() => {
          console.log('reconcile');
        }}
      >
        Reconcile
      </Button>
      <Button
        variant="outline-secondary"
        onClick={() => {
          console.log('undo');
          sendUndoAction();
        }}
      >
        Undo
      </Button>
    </ButtonGroup>
  );
};

export const PopupUndo = () => {
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Undo action</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Can I go back?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => {}}>
          Close
        </Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

// class PopupUndo extends Component {
//   constructor() {
//     super();

//     this.state = {
//       isModalOpen: false
//     };
//   }

//   handleToggle() {
//     const { isOpen } = this.state;
//     this.setState({
//       isModalOpen: !isOpen
//     });
//   }

//   // This is called by the `OverlayMixin` when this component
//   // is mounted or updated and the return value is appended to the body.
//   renderOverlay() {
//     const { isOpen } = this.state;
//     if (!isOpen) {
//       return <span />;
//     }

//     return (
//       <Modal
//         bsStyle="primary"
//         title="Modal heading"
//         onRequestHide={this.handleToggle}
//       >
//         <div className="modal-body">
//           This modal is controlled by our custom trigger component.
//         </div>
//         <div className="modal-footer">
//           <Button onClick={this.handleToggle}>Close</Button>
//         </div>
//       </Modal>
//     );
//   }

//   render() {
//     return (
//       <Button onClick={this.handleToggle} bsStyle="primary">
//         Launch
//       </Button>
//     );
//   }
// }

// export default PopupUndo;
