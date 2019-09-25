import React from "react";
import { Spinner } from "reactstrap";

export default class Loading extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <div style={{ textAlign: "center", paddingTop: "10px" }}>
        <h1>{title}</h1>
        <Spinner color="primary" />
      </div>
    );
  }
}
