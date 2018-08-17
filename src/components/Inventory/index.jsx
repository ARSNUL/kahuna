import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { PropTypes } from 'prop-types';
import DLObjects from '../DLObjects';
import './index.css';
import appConfig from '../../appConfig.json';
import LeftNav from '../LeftNav';
import Loading from '../Loading';
import wrapper from '../../utils/cognito';
import * as loadingdataActions from '../../actions/loadingdata';
import * as objectsActions from '../../actions/objects';

class Inventory extends Component {
  static responseFailure(err) {
    console.warn(err);
  }

  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = {
      dlobjects: [],
      qs: queryString.parse(location.search),
    };
    this.responseSuccess = this.responseSuccess.bind(this);
    Inventory.responseFailure = Inventory.responseFailure.bind(this);
  }

  componentWillMount() {
    const { setIsLoading } = this.props;
    const { qs } = this.state;
    if (qs.id === undefined) {
      setIsLoading(true);
      wrapper(
        appConfig.apis.objects.uri,
        'GET',
        this.responseSuccess,
        this.responseFailure,
        {},
      );
    }
  }

  responseSuccess(response) {
    const { setIsLoading, addObjects } = this.props;
    const arrObjectParams = [];
    response.data.hits.hit.forEach((objItem) => {
      let objObjectParams = {};
      Object.keys(objItem.fields).forEach((key) => {
        switch (key) {
          case 'contentlength':
            objObjectParams = {
              ...objObjectParams,
              [key]: parseInt(objItem.fields[key][0], 10),
            };
            break;
          case 'eventtime':
            objObjectParams = {
              ...objObjectParams,
              [key]: new Date(parseInt(objItem.fields[key][0], 10)),
            };
            break;
          case 'lastmodified':
            objObjectParams = {
              ...objObjectParams,
              lastmodified: new Date(parseInt(objItem.fields[key][0], 10)),
            };
            break;
          default:
            objObjectParams = { ...objObjectParams, [key]: objItem.fields[key][0] };
        }
      });
      arrObjectParams.push(objObjectParams);
    });
    setIsLoading(false);
    addObjects(arrObjectParams);
    this.setState({ dlobjects: arrObjectParams });
  }

  render() {
    const { dlobjects } = this.state;
    return (
      <div className="Inventory">
        <Loading />
        <LeftNav pathname={window.location.pathname} />
        <div className="content">
          <div className="abdhr">
            <div className="abdhs">
              <h1>
                Data Lake Inventory
              </h1>
            </div>
          </div>
          <DLObjects dlobjects={dlobjects} />
        </div>
      </div>
    );
  }
}

Inventory.propTypes = {
  addObjects: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.string,
  }),
};

Inventory.defaultProps = {
  location: {},
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps,
  {
    ...objectsActions,
    ...loadingdataActions,
  })(Inventory));
