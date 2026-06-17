import { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_WISHLIST': {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] }, () => {
    const saved = localStorage.getItem('wishlist');
    return saved ? { items: JSON.parse(saved) } : { items: [] };
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const toggleWishlist = (product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (id) => {
    return state.items.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{
      items: state.items,
      toggleWishlist,
      clearWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useWishlist = () => useContext(WishlistContext);