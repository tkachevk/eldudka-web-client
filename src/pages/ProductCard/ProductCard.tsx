import React, { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container/Container';
import { LOCALSTORAGE_KEYS } from '../../utils/constants';
import { Button } from '../../components/Button/Button';
import classes from './ProductCard.module.scss';

export const ProductCard = () => {
  let [responseData, setResponseData] = useState<any>(null);
  const [shoppingCart, setShoppingCart] = useLocalStorage(LOCALSTORAGE_KEYS.shoppingCart, []);
  const [favorites, setFavorites] = useLocalStorage(LOCALSTORAGE_KEYS.favorites, []);

  let { card } = useParams<any>();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/Product/${card}`)
      .then(response => response.json())
      .then(data => {
        setResponseData(data);
      });
  }, [card]);

  const existsCurrentProductInShoppingCart = () =>
    shoppingCart.filter((p: any) => p.id === responseData.id).length > 0;

  const existsCurrentProductInFavorites = () =>
    responseData ? favorites.filter((p: any) => p.id === responseData.id).length > 0 : null;

  return responseData ? (
    <div className={classes['cards-wrapper']}>
      <Container>
        <div className={classes['flex-block']}>
          {responseData.images.map((item, index) => (
            <img key={index} className={classes['image-card']} src={item} alt="" />
          ))}
          <div className={classes['content-block']}>
            <div className={classes['product-name']}>{responseData.name}</div>
            <div className={classes['product-price']}>{responseData.price} ₽</div>
            <div className={classes['flex-block-center']}>
              <Button
                onClick={() => {
                  const shoppingCartNewArray: any = shoppingCart.map(p => p);

                  if (!existsCurrentProductInShoppingCart()) {
                    shoppingCartNewArray.push({ id: responseData.id, amount: 1 });
                    setShoppingCart(shoppingCartNewArray);
                  } else {
                    setShoppingCart(shoppingCartNewArray.filter(p => p.id !== responseData.id));
                  }
                }}
                text={existsCurrentProductInShoppingCart() ? 'Добавлен' : 'В корзину'}
                style={existsCurrentProductInShoppingCart() ? 'active' : 'default'}
              />
              <button
                onClick={() => {
                  const favoritesNewArray: any = favorites.map(p => p);

                  if (!existsCurrentProductInFavorites()) {
                    favoritesNewArray.push({ id: responseData.id });
                    setFavorites(favoritesNewArray);
                  } else {
                    setFavorites(favoritesNewArray.filter(p => p.id !== responseData.id));
                  }
                }}
                className={`${classes['button-favorites']} ${
                  existsCurrentProductInFavorites() ? classes['active'] : ''
                }`}
              >
                <img className={classes['heart-icon']} src="./heart-icon.png" alt="" />
              </button>
            </div>
            <div className={classes['product-description']}>{responseData.description}</div>
            <div className={classes['location']}>
              <img src="./vector.png" alt="" />
              <p className={classes['location-availability']}>Наличие в магазинах</p>
            </div>
            <div className={classes['product-availability']}>
              {responseData.availability.map((item, index) => (
                <div key={index}>
                  <span className={classes['availability-shop-name']}>{item.shop.name} </span>
                  <span className={classes['availability-shop-count']}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
};
