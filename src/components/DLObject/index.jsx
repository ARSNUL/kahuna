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
    const { hovered } = this.state;
    if (hovered) {
      return 'DLObject Hovered';
    }
    return 'DLObject';
  }

  render() {
    const { showDLObjectDetail } = this.state;
    const { params } = this.props;
    const id = params.key;
    if (showDLObjectDetail) {
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
        <td className="objectkey">{params.contentlength}</td>
        <td className="objectcontenttype">{params.contenttype}</td>
        <td className="object">
          <DateReadable id="last_modified" value={params.lastmodified} />
        </td>
        <td className="Object Key">{params.awsregion}</td>
        <td className="Object Key">{params.bucket}</td>
        <td className="Object Key">{params.eventname}</td>
        <td className="Object LastLogin">
          <DateReadable id="last_modified" value={params.eventtime} />
        </td>
        <td className="Object Key">{params.filename}</td>
        <td className="Object Key">{params.key}</td>
        <td className="Object Key">{params.sourceipaddress}</td>
      </tr>
    );
  }
}

DLObject.propTypes = {
  params: PropTypes.shape({
    contentlength: PropTypes.number,
    contenttype: PropTypes.string,
    lastmodified: PropTypes.instanceOf(Date),
    awsregion: PropTypes.string,
    bucket: PropTypes.string,
    eventname: PropTypes.string,
    eventtime: PropTypes.instanceOf(Date),
    filename: PropTypes.string,
    key: PropTypes.string,
    sourceipaddress: PropTypes.string,
  }),
};

DLObject.defaultProps = {
  params: {},
};

export default DLObject;
