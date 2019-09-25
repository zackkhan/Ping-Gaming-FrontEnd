import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import { fetchData } from "../actions/simpleAction";
import MediaCard from "./MediaCard";
import Loading from "./loading";

const mapDispatchToProps = dispatch => ({
  fetchData: (endpoints, params) => dispatch(fetchData(endpoints, params))
});

const mapStateToProps = state => ({
  ...state
});

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = { gamesLoaded: false };
  }

  componentWillMount() {
    this.props
      .fetchData("games", {})
      .then(() => this.setState({ gamesLoaded: true }));
  }

  render() {
    if (this.state.gamesLoaded) {
      return (
        <div>
          <div
            className="centered"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <h3 style={{ paddingTop: "10px" }}>
              Play Games With Your Friends!
            </h3>
            {this.state.gamesLoaded &&
              this.props.simpleReducer.games.map(game => {
                return (
                  <MediaCard
                    key={game["id"]}
                    game={game["id"]}
                    gameObject={game}
                    rules={game["rules"]}
                    title={game["name"]}
                    text={game["description"]}
                    img={game["image_name"]}
                    action1="Play against Computer"
                    action2="Play against Friend"
                  />
                );
              })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Loading title="Loading Games..." />
        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discover);
