import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './app.css';
import MainLayout from './components/mainLayout';
import ScrollToTop from './scrollToTop';
import withUserAuthedAndLoaded from './withUserAuthedAndLoaded';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // items: [],
      // boxSets: [],
      // sizes: {},
      // sizesArray: [],
      // formats: [],
      // apiQueue: [],
    };

    // this.db = firebase.firestore();
  }

  componentWillMount() {
    // this.db.collection('Sizes').onSnapshot((snap) => {
    //   const sizes = {};
    //   const sizesArray = [];
    //   snap.forEach((size) => {
    //     sizes[size.id] = size.data();
    //     sizesArray.push({ id: size.id, name: size.data().name });
    //   });
    //   this.setState({
    //     sizes, sizesArray, sizesLoaded: true,
    //   });
    // });
  }



  render() {
    return (
      <Router className="App">
        <ScrollToTop>
          <MainLayout />
        </ScrollToTop>
      </Router>
    );
  }
}


export default withUserAuthedAndLoaded(App);
