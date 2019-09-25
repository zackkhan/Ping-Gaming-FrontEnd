import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem
} from "reactstrap";

import { NavLink as NL } from "react-router-dom";

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            Ping
            <img
              src={require("../img/ball.png")}
              height={50}
              width={60}
              style={{ paddingLeft: "5px" }}
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>
                  <NL to="/">Home</NL>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://oneclick.chat/events/1375/meeting"
                  target="_blank"
                >
                  Chat
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
