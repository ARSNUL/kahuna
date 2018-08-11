import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import DLObject from '../DLObject';
import './index.css';

class DLObjects extends PureComponent {
  render() {
    const dlobjects = this.props.dlobjects.map(
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
                  ContentLength
                </th>
                <th>
                  ContentType
                </th>
                <th>
                  LastModified
                </th>
                <th>
                  awsRegion
                </th>
                <th>
                  bucket
                </th>
                <th>
                  EventName
                </th>
                <th>
                  EventTime
                </th>
                <th>
                  filename
                </th>
                <th>
                  key
                </th>
                <th>
                  sourceIPAddress
                </th>
              </tr>
            </thead>
            <tbody>
              {dlobjects}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

DLObjects.propTypes = {
  dlobjects: PropTypes.arrayOf(PropTypes.shape({
    ContentLength: PropTypes.number,
    ContentType: PropTypes.string,
    LastModified: PropTypes.date,
    awsRegion: PropTypes.string,
    bucket: PropTypes.string,
    eventName: PropTypes.string,
    eventTime: PropTypes.date,
    filename: PropTypes.string,
    key: PropTypes.string,
    sourceIPAddress: PropTypes.string,
  })),
};

DLObjects.defaultProps = {
  dlobjects: [
    {
      ContentLength: 0,
      ContentType: null,
      LastModified: null,
      awsRegion: null,
      bucket: null,
      eventName: null,
      eventTime: null,
      filename: null,
      key: null,
      sourceIPAddress: null,
    },
  ],
};

export default DLObjects;
