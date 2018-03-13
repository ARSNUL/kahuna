import React from 'react';
import './index.css';
// import Menu from '../Menu';
// import SearchForm from '../SearchForm';
// import MenuFlyout from '../MenuFlyout';

function FilterMenu() {
  return (
    <div className="FilterMenu">
      <div>
        <div>
          <div>
            <div>
              <div>Filters</div>
              <div>
                <div>
                  <div>By User Type</div>
                  <div>
                    <input type="text" aria-hidden="true" />
                    <div>Active Users</div>
                    <div>Disabled Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterMenu;
