import React from 'react';
import './index.css';
import { PropTypes } from 'prop-types';
import LeftNavItem from '../LeftNavItem';

function LeftNav({ pathname }) {
  const arrNavs = [
    {
      simplePath: 'Users', pathname: '/Users',
    },
    {
      simplePath: 'Inventory', pathname: '/Inventory',
    },
    {
      simplePath: 'Upload', pathname: '/Upload',
    },
  ];
  const leftnavitems = arrNavs.map((obj) => {
    const boolActive = obj.pathname === pathname;
    return (
      <LeftNavItem
        key={obj.simplePath}
        active={boolActive}
        pathname={obj.pathname}
        simplePath={obj.simplePath}
      />
    );
  });
  return (
    <nav className="LeftNav">
      <ul>
        {leftnavitems}
      </ul>
    </nav>
  );
}

LeftNav.propTypes = {
  pathname: PropTypes.string,
};

LeftNav.defaultProps = {
  pathname: '',
};

export default LeftNav;
