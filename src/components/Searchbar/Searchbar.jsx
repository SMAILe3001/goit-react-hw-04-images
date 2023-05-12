import { useState } from 'react';
import { HiOutlineSearchCircle } from 'react-icons/hi';
import PropTypes from 'prop-types';
import CSS from './Searchbar.module.css';

export const Searchbar = ({ onSubmit, isLoading }) => {
  const [searchText, setSearchText] = useState('');

  const handelInputChange = e => {
    setSearchText(e.currentTarget.value);
  };

  const handelInputSubmit = e => {
    e.preventDefault();

    onSubmit(searchText);

    setSearchText('');
  };

  const {
    searchbar,
    searchForm,
    searchFormButton,
    searchFormLabel,
    searchFormInput,
  } = CSS;

  return (
    <header className={searchbar}>
      <form className={searchForm} onSubmit={handelInputSubmit}>
        <button type="submit" className={searchFormButton} disabled={isLoading}>
          <HiOutlineSearchCircle style={{ width: '32px', height: '32px' }} />
        </button>
        <label className={searchFormLabel}>
          <input
            className={searchFormInput}
            type="text"
            name="searchText"
            required
            value={searchText}
            onChange={handelInputChange}
          />
        </label>
      </form>
    </header>
  );
};

Searchbar.propType = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};
