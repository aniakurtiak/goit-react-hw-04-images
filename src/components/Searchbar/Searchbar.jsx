import React, { Component } from 'react';
import toast from 'react-hot-toast';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = evt => {
    this.setState({ query: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (evt.target.elements.search.value === '') {
      toast.error('Gotta write something!');
      return;
    }
    this.props.onSubmit(evt);
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit} className="Searchbar">
          <button type="submit" className="Searchbar-button">
            <span className="Searchbar-button-label">Search</span>
          </button>
          <input
            name="search"
            className="Searchbar-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
