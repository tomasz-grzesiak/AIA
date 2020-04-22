import React from "react";

import "./Item.css";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: this.props.content.first,
      last: this.props.content.last,
      age: this.props.content.age
    };
    this.state.edit = this.state.first === '' || this.state.last === '';
  }

  edit() {
    this.setState({ edit: !this.state.edit });
  }

  firstChange(event) {
    this.setState({ first: event.target.value });
  }

  lastChange(event) {
    this.setState({ last: event.target.value });
  }

  ageChange(event) {
    this.setState({ age: Math.max(event.target.value, 0) });
  }

  render() {
    return (
      <div className="content-row">
        <div className="content-row-field center">
          {!this.state.edit ? (
            this.state.first
          ) : (
            <input
              type="text"
              value={this.state.first}
              onChange={this.firstChange.bind(this)}
            />
          )}
        </div>
        <div className="content-row-field center">
          {!this.state.edit ? (
            this.state.last
          ) : (
            <input
              type="text"
              value={this.state.last}
              onChange={this.lastChange.bind(this)}
            />
          )}
        </div>
        <div className="content-row-field center">
          {!this.state.edit ? (
            this.state.age
          ) : (
            <input
              type="number"
              value={this.state.age}
              onChange={this.ageChange.bind(this)}
            />
          )}
        </div>
        <div className="content-row-field space">
          <button onClick={this.edit.bind(this)}>{this.state.edit ? "Save row" : "Edit row"}</button>
          <button onClick={() => this.props.onRemove(this.props.content.id)}>Delete row</button>
        </div>
      </div>
    );
  }
}

export default Item;
