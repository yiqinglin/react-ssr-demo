/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';

import CoffeeList from './components/CoffeeList';

class Demo3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { coffeeDrinks: [] };

    if (props.staticContext && props.staticContext.data) {
      // run on server.
      this.state = {
        ...this.state,
        coffeeDrinks: props.staticContext.data,
      };
    //  } else if (window.__ROUTE_DATA__) {
    //   // client side.
    //   this.state = {
    //     ...this.state,
    //     coffeeDrinks: window.__ROUTE_DATA__,
    //   };
    //   delete window.__ROUTE_DATA__;
    }
  }

  componentDidMount() {
    // setTimeout(() => {
    //   if (!window.__ROUTE_DATA__) {
    //     console.log('No preloaded data from server. Fetching now...');
    //     fetch('/api/getCoffee')
    //       .then(res => res.json())
    //       .then(returnData => this.setState({
    //         coffeeDrinks: returnData.data,
    //       }));
    //   }
    // }, 0);
  }

  render() {
    const { coffeeDrinks } = this.state;

    return (
      <>
        <h1>Server serves coffee!</h1>
        <p>Now our data has been fetched on server!</p>
        <CoffeeList drinks={coffeeDrinks} />
      </>
    );
  }
}

export default Demo3;
