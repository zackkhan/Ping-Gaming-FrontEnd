import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { server_url } from "../server_url";
import ShareModal from "./ShareModal";
import PlainModal from "./PlainModal";
const axios = require("axios");
const styles = {
  blue_button: {
    backgroundColor: "#2186FF",
    color: "#FFFFFF"
  },
  green_button: {
    backgroundColor: "#25A18E",
    color: "#FFFFFF"
  },
  light_blue_button: {
    backgroundColor: "#CCE4FF",
    color: "#000000"
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

function makeid(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

class MediaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      ruleModal: false,
      modalBody: "",
      joinLink: ""
    };

    this.toggle = this.toggle.bind(this);
    this.ruleToggle = this.ruleToggle.bind(this);
    this.goToGame = this.goToGame.bind(this);
    this.handleMultiplayerGame = this.handleMultiplayerGame.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  ruleToggle() {
    this.setState(prevState => ({
      ruleModal: !prevState.ruleModal
    }));
  }

  goToGame() {
    window.location = this.state.joinLink;
    window.href = this.state.joinLink;
  }

  redirect(url) {
    window.location = url;
    window.href = url;
  }

  playGame(gameObject) {
    const game_server = gameObject.url;
    // some game urls need lobby codes
    if (gameObject.needs_lobby_code) {
      const id = makeid(6);
      const join_code = game_server + "/joincpu/" + id;
      axios.get(join_code).then(data => {
        this.redirect(game_server + data.data.url);
      });
    } else {
      this.redirect(game_server);
    }
  }
  handleMultiplayerGame() {
    // TODO: Add matching function (instead of sharing links)
    this.setState({ modal: true });
    console.log(this.props.game);
    if (this.props.gameObject.is_standalone) {
      this.setState({ joinLink: this.props.gameObject.url });
    } else {
      axios
        .get(server_url + "matches/", {
          params: { game_id: this.props.game }
        })
        .then(response => {
          this.setState({ joinLink: response.data.link });
          console.log(response);
          console.log(response.data);
        });
    }
  }

  render() {
    const {
      gameObject,
      game,
      rules,
      title,
      text,
      img,
      action1,
      action2
    } = this.props;
    const id = makeid(6);
    let body = "";
    if (this.props.game == 2) {
      body =
        'Steps to play with a friend: <ol> <li> Click join game to be redirected to new page </li>  <li> Then click host match </li> <li> Choose your player name then click Ok </li> <li> Click "copy match link" button to share the link with a friend </li> <li> Once your friend clicks the link, the game will start! </li>';
    } else {
      body =
        "To play with a friend, your friend must click on your game link. Here are the steps to play with a friend: <ol> <li> Choose from the following options to share the link with a friend: Facebook, Whatsapp, Email, SMS (if on mobile device) or copying the link to your clipboard </li> <li> After your friend joins your link, the game will start </li>";
    }
    return (
      <div
        style={{ margin: "50px", textAlign: "left", justifyContent: "left" }}
        className="padding"
      >
        <ShareModal
          buttonLabel="test"
          className="test"
          modal={this.state.modal}
          toggle={this.toggle}
          title="Invite your friend!"
          body={body}
          game={game}
          gameObject={gameObject}
          link={this.state.joinLink}
          click={this.goToGame}
        />
        <PlainModal
          buttonLabel="test"
          className="test"
          modal={this.state.ruleModal}
          toggle={this.ruleToggle}
          title="Rules"
          body={rules}
          game={game}
        />
        <Card>
          <CardActionArea>
            <CardMedia image={"../../public/img/ " + img} title={title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography component="p">{text}</Typography>
            </CardContent>
          </CardActionArea>

          <div style={{ textAlign: "center", justifyContent: "center" }}>
            <CardActions>
              {this.props.gameObject.can_play_with_computer && (
                <Button
                  style={styles.green_button}
                  size="medium"
                  onClick={() => {
                    this.playGame(gameObject);
                  }}
                  color="primary"
                >
                  {action1}
                </Button>
              )}
              <Button
                style={styles.blue_button}
                onClick={() => {
                  this.handleMultiplayerGame();
                }}
                size="medium"
                color="primary"
              >
                {action2}
              </Button>
              <Button
                style={styles.light_blue_button}
                size="medium"
                onClick={() => {
                  this.ruleToggle();
                }}
                color="primary"
              >
                Rules
              </Button>
            </CardActions>
          </div>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(MediaCard);
