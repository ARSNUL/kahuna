import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import DLObject from '../DLObject';
import './index.css';

class DLObjects extends PureComponent {
  render() {
    const { dlobjects } = this.props;
    const objects = dlobjects.map(
      obj => <DLObject key={obj.key} params={obj} />,
    );
    return (
      <div className="DLObjects">
        <div className="O2">
          <table cellSpacing="0" cellPadding="0">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>
                  Content Length
                </th>
                <th>
                  Content Type
                </th>
                <th>
                  Last Modified
                </th>
                <th>
                  AWS Region
                </th>
                <th>
                  Bucket
                </th>
                <th>
                  Event Name
                </th>
                <th>
                  Event Time
                </th>
                <th>
                  Filename
                </th>
                <th>
                  S3 Key
                </th>
                <th>
                  Source IP Address
                </th>
              </tr>
            </thead>
            <tbody>
              {objects}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

DLObjects.propTypes = {
  dlobjects: PropTypes.arrayOf(PropTypes.shape({
    contentlength: PropTypes.number,
    contenttype: PropTypes.string,
    lastmodified: PropTypes.date,
    awsregion: PropTypes.string,
    bucket: PropTypes.string,
    eventname: PropTypes.string,
    eventtime: PropTypes.date,
    filename: PropTypes.string,
    key: PropTypes.string,
    sourceipaddress: PropTypes.string,
  })),
};

DLObjects.defaultProps = {
  dlobjects: [
    {
      contentlength: 0,
      contenttype: null,
      lastmodified: null,
      awsregion: null,
      bucket: null,
      eventname: null,
      eventtime: null,
      filename: null,
      key: null,
      sourceipaddress: null,
    },
  ],
};

export default DLObjects;
