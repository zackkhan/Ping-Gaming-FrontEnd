import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton
} from "react-share";
import { Markup } from "interweave";
import { FacebookIcon, WhatsappIcon, EmailIcon } from "react-share";

import { isMobile, isAndroid, isIOS } from "react-device-detect";
class ShareModal extends React.Component {
  render() {
    var sms_href = "";
    let copyLink = this.props.link;

    // custom link for checkers
    if (copyLink.indexOf("checkers") != -1) {
      const copy = copyLink.replace(/.$/, "2");
      copyLink = copy;
    }
    // handling different sms link formats for android and iOS
    if (isMobile) {
      if (isAndroid) {
        sms_href = "sms:?body=" + copyLink;
      } else if (isIOS) {
        sms_href = "sms:&body=" + copyLink;
      }
    }

    return (
      <div>
        <Modal
          scrollable={true}
          isOpen={this.props.modal}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            <Markup content={this.props.body} />
            <FacebookShareButton url={copyLink}>
              <FacebookIcon size={64} round={true} />{" "}
            </FacebookShareButton>
            {isMobile && <b />}
            <WhatsappShareButton url={copyLink}>
              {" "}
              <WhatsappIcon size={64} round={true} />{" "}
            </WhatsappShareButton>
            {isMobile && <b />}
            <EmailShareButton
              subject={"Play this fun game with me!"}
              body={copyLink}
              url={copyLink}
            >
              {" "}
              <EmailIcon size={64} round={true} />{" "}
            </EmailShareButton>
            {isMobile && <b />}
            {isMobile && <a href={sms_href}> Share with Text</a>}
          </ModalBody>
          <ModalFooter>
            {this.props.gameObject.name != "Connect Four 🔴" && (
              <CopyToClipboard
                text={copyLink}
                onCopy={() => console.log("copied")}
              >
                <Button color="primary">Copy link</Button>
              </CopyToClipboard>
            )}
            <Button
              color="primary"
              onClick={() => {
                this.props.click();
              }}
            >
              Join Game
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ShareModal;
