import React from 'react';
import { PropTypes } from 'prop-types';

function LeftNavItem({ active, simplePath, pathname }) {
  const className = active ? 'NavItem NavSelected' : 'NavItem';
  return (
    <li>
      <a className={className} href={pathname}>
        <span>
          {simplePath}
        </span>
      </a>
    </li>
  );
}

LeftNavItem.propTypes = {
  active: PropTypes.bool,
  simplePath: PropTypes.string,
  pathname: PropTypes.string,
};

LeftNavItem.defaultProps = {
  active: false,
  simplePath: '',
  pathname: '',
};

export default LeftNavItem;
