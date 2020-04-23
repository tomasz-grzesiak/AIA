import React from "react";

import "./Item.css";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.content.id,
      image: this.props.content.image,
      name: this.props.content.name,
      description: this.props.content.description,
      rating: this.props.content.rating
    };
    this.state.edit = this.state.name === '' || this.state.description === '';
  }

  edit() {
    if (this.state.edit){
      this.props.onSave({id: this.state.id, image: this.state.image, name: this.state.name,
        description: this.state.description, rating: this.state.rating});
    }
    this.setState({ edit: !this.state.edit });  
  }

  nameChange(event) {
    this.setState({ name: event.target.value });
  }

  descriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  ratingChange(event) {
    this.setState({ rating: Math.max(event.target.value, 0) });
  }

  render() {
    return (
      <div className="content-row">
        <div className="content-row-field space">
          <img src={this.state.image} alt={this.state.name} /> 
        </div>
        <div className="content-row-field space">
          {!this.state.edit ? (
            this.state.name
          ) : (
            <input
              type="text"
              value={this.state.name}
              onChange={this.nameChange.bind(this)}
            />
          )}
        </div>
        <div className="content-row-field space">
          {!this.state.edit ? (
            this.state.description
          ) : (
            <textarea 
              type="text"
              value={this.state.description}
              onChange={this.descriptionChange.bind(this)}
            />
          )}
        </div>
        <div className="content-row-field space">
          {!this.state.edit ? (
            this.state.rating
          ) : (
            <input
              type="number"
              value={this.state.rating}
              onChange={this.ratingChange.bind(this)}
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
