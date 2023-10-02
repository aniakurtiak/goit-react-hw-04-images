import toast from 'react-hot-toast';
import { HiSearch } from 'react-icons/hi';
import { SearchForm, Input, SearchButton } from './Searchbar.styled';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = evt => {
    setQuery(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (evt.target.elements.search.value === '') {
      toast.error('Gotta write something!');
      return;
    }
    onSubmit(evt);
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchButton type="submit">
        <HiSearch size={20} />
      </SearchButton>
      <Input
        name="search"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={query}
        onChange={handleChange}
      />
    </SearchForm>
  );
};
