import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalExample extends React.Component {  
    render() {
      return (
        <div>
          <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
            <ModalBody>
              {this.props.body}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.props.toggle}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }



  export default ModalExample;