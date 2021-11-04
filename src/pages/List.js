import React from "react";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      token: "",
    };

    this.getUrls = this.getUrls.bind(this);
  }

  componentDidMount() {
    this.getUrls();
  }

  async getUrls() {
    this.setState({
      token: await JSON.parse(localStorage.getItem("user")).token,
    });
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.token,
      },
    };

    try {
      fetch("/api/url/list", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            this.setState({ urls: data.value.urls });
          }
        });
    } catch (err) {
      if (err) console.error(err);
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.urls &&
            this.state.urls.map((url) => <li key={url._id}>{url.shortUrl}</li>)}
        </ul>
      </div>
    );
  }
}
