import React from 'react';
import './index.css';

function SearchForm() {
  return (
    <div className="SearchForm">
      <form>
        <div>
          <input
            aria-label="Search"
            autoComplete="off"
            placeholder="Search for users, groups, and settings (e.g. setup MX records)"
          />
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
