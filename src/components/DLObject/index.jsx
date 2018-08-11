import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import DateReadable from '../DateReadable';
import './index.css';
// import DLObjectDetail from '../DLObjectDetail';

class DLObject extends Component {
  static handleClick(id) {
    window.location = `/DLObjects/DLObject?id=${id}`;
    // this.setState({ showDLObjectDetail: true });
  }

  constructor(props) {
    super(props);
    this.state = { showDLObjectDetail: false };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClick = DLObject.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown() {
    this.setState({ showDLObjectDetail: true });
  }

  handleMouseOver() {
    this.setState({ hovered: true });
  }

  handleMouseOut() {
    this.setState({ hovered: false });
  }

  theClass() {
    if (this.state.hovered) {
      return 'DLObject Hovered';
    }
    return 'DLObject';
  }

  render() {
    const id = this.props.params.key;
    if (this.state.showDLObjectDetail) {
      // return <DLObjectDetail idObject={id} />;
    }
    return (
      <tr
        className={this.theClass()}
        onMouseOver={this.handleMouseOver}
        onFocus={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onBlur={this.handleMouseOut}
        onClick={e => this.handleClick(id, e)}
        onKeyDown={this.handleKeyDown}
        role="presentation"
      >
        <td className="objectkey">{this.props.params.ContentLength}</td>
        <td className="objectcontenttype">{this.props.params.ContentType}</td>
        <td className="object">
          <DateReadable id="last_modified" value={this.props.params.LastModified} />
        </td>
        <td className="Object Key">{this.props.params.awsRegion}</td>
        <td className="Object Key">{this.props.params.bucket}</td>
        <td className="Object Key">{this.props.params.eventName}</td>
        <td className="Object LastLogin">
          <DateReadable id="last_modified" value={this.props.params.eventTime} />
        </td>
        <td className="Object Key">{this.props.params.filename}</td>
        <td className="Object Key">{this.props.params.key}</td>
        <td className="Object Key">{this.props.params.sourceIPAddress}</td>
      </tr>
    );
  }
}

DLObject.propTypes = {
  params: PropTypes.shape({
    ContentLength: PropTypes.number,
    ContentType: PropTypes.string,
    LastModified: PropTypes.instanceOf(Date),
    awsRegion: PropTypes.string,
    bucket: PropTypes.string,
    eventName: PropTypes.string,
    eventTime: PropTypes.instanceOf(Date),
    filename: PropTypes.string,
    key: PropTypes.string,
    sourceIPAddress: PropTypes.string,
  }),
};

DLObject.defaultProps = {
  params: {},
};

export default DLObject;
