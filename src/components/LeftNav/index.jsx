import React, { Component } from 'react';
import './index.css';

class LeftNav extends Component {
  render() {
    return (
      <div className="LeftNav">
        <div>
          <div>
            <div>
              <div>
                <div>Nav</div>
                <div>
                  <div>
                    <div>By User Type</div>
                    <div>
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
}

export default LeftNav;
