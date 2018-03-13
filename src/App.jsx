import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import logo from './logo.svg';
import Routes from './Routes';
import Header from './components/Header';
import './common/style.scss';
import './App.css';

function App() {
  return (
    <div className="App container">
      <Header />
      <Routes />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication.authentication,
    redirectUrl: state.redirectUrl,
  };
}

export default withRouter(connect(mapStateToProps)(App));
