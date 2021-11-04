import React from "react";
import List from "./List";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "", generatedUrl: "", copiedToClipboard: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  handleSubmit(event) {
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("user")).token || "",
      },
      body: JSON.stringify({ longUrl: this.state.url }),
    };

    try {
      fetch("api/url/shorten", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log(data);
            this.setState({
              generatedUrl: data.value.url,
              copiedToClipboard: false,
            });
          }
        });
    } catch (err) {
      console.error(err);
    }

    event.preventDefault();
  }

  copyToClipboard(event) {
    this.setState({
      copiedToClipboard: true,
    });

    navigator.clipboard.writeText(this.state.generatedUrl);
  }

  render() {
    return (
      <div className="container row">
        <div className="col-6 p-2">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <input
                type="text"
                name="url"
                value={this.state.url}
                onChange={this.handleChange}
                placeholder="Enter your URL..."
                className="mr-1 col-8"
              />
              <input
                className="btn btn-light-blue"
                type="submit"
                value="Generate URL"
              />
            </div>
          </form>
          {this.state.generatedUrl && (
            <div className="mt-1">
              <label htmlFor="">Short URL</label>
              <div className="row">
                <input
                  type="text"
                  disabled
                  value={this.state.generatedUrl}
                  className="col-8 mr-1"
                />
                <input
                  className="btn btn-dark-blue"
                  type="button"
                  value="Copy to clipboard"
                  onClick={this.copyToClipboard}
                />
              </div>
            </div>
          )}
          {this.state.generatedUrl && this.state.copiedToClipboard && (
            <small>URL copied to clipboard</small>
          )}
        </div>
        <div className="col-6 p-2">
          <h3>Generated URL</h3>
          <List></List>
        </div>
      </div>
    );
  }
}

export default Home;
