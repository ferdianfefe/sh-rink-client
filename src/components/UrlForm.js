import React from "react";

class UrlForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "", generatedUrl: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  handleSubmit(event) {
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl: this.state.url }),
    };

    try {
      fetch("http://localhost:3000/api/url/shorten", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            generatedUrl: data.value.url,
          });
        });
    } catch (err) {
      console.error(err);
    }

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Insert URL:
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Generate URL" />
        </form>
        {this.state.generatedUrl && (
          <div>
            <form action="">
              <input type="text" disabled value={this.state.generatedUrl} />
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default UrlForm;
