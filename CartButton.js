import classes from './CartButton.module.css';
import { uiActions } from '../../store/uiSlice'; 
import {useDispatch, useSelector} from 'react-redux';

const CartButton = (props) => {

  const dispatch = useDispatch();
  const CartQuantity = useSelector(state => state.cart.totalQuantity)

  const toggleHandler = () => {
    dispatch(uiActions.toggle());
  }
  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{CartQuantity}</span>
    </button>
  );
};

export default CartButton;
