import React, { Component } from 'react';
import MainRoute from './routes/MainRoute';
import { Provider } from 'react-redux';  
import { store } from './store/store';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainRoute />
      </Provider>
     
    );
  } 
}


export default App;
