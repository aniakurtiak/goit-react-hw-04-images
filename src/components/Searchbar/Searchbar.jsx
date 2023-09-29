import React, { Component } from 'react';
import toast from 'react-hot-toast';
import { HiSearch } from 'react-icons/hi';
import { SearchForm, Input, SearchButton } from './Searchbar.styled';

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
      <SearchForm onSubmit={this.handleSubmit}>
        <SearchButton type="submit">
          <HiSearch size={20} />
        </SearchButton>
        <Input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={this.state.query}
          onChange={this.handleChange}
        />
      </SearchForm>
    );
  }
}
