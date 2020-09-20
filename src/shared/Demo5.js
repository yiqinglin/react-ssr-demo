/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { inlineStyles } from './utils';

import CoffeeList from './components/CoffeeList';

function Demo5({ drinks, favorite, selectFavorite }) {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    setImgSrc('/banner.jpg');
  }, []);

  return (
    <>
      <h1>Server serves coffee!</h1>
      <div style={inlineStyles.placeholder}>
        { imgSrc && <img src={imgSrc} alt="Go get coffee" style={inlineStyles.img} />}
      </div>
      <CoffeeList drinks={drinks} favorite={favorite} selectFavorite={selectFavorite} />
    </>
  );
}

const mapStateToProps = state => ({
  drinks: state.coffeeDrinks,
  favorite: state.favorite
});

const mapDispatchToProps = dispatch => ({
  selectFavorite: (id) => { dispatch({ type: 'SELECT_FAVORITE', id }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Demo5);
