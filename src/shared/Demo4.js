/* eslint-disable no-underscore-dangle */
import React from 'react';

import CoffeeList from './components/CoffeeList';


class Demo4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { coffeeDrinks: [], imgSrc: '' };

    if (props.staticContext && props.staticContext.data) {
      this.state = {
        ...this.state,
        coffeeDrinks: props.staticContext.data,
      };
    } else if (window.__ROUTE_DATA__) {
      // client side.
      this.state = {
        ...this.state,
        coffeeDrinks: window.__ROUTE_DATA__,
      };
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (window.__ROUTE_DATA__) {
        console.log('Using preloaded data from server.');
        this.setState({
          coffeeDrinks: window.__ROUTE_DATA__,
        });
        delete window.__ROUTE_DATA__;
      } else {
        console.log('No preloaded data from server. Fetching now...');
        fetch('/api/getCoffee')
          .then(res => res.json())
          .then(returnData => this.setState({
            coffeeDrinks: returnData.data,
          }));
      }
    }, 0);

    setTimeout(() => this.setState({ imgSrc: '/banner.jpg' }), 2000);
  }

  render() {
    const { imgSrc, coffeeDrinks } = this.state;
    const inlineStyles = {
      placeholder: {
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
      },
      img: {
        width: '100%',
        height: 'auto',
      }
    };

    return (
      <>
        <h1>Server serves coffee!</h1>
        {imgSrc
          && (
          <div style={inlineStyles.placeholder}>
            <img src={imgSrc} alt="Go get coffee" style={inlineStyles.img} />
          </div>
          )
        }
        <CoffeeList drinks={coffeeDrinks} />
      </>
    );
  }
}

export default Demo4;
