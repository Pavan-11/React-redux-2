import Card from '../UI/Card';
import classes from './ProductItem.module.css';

import {useDispatch} from 'react-redux';
import { cartActions } from '../../store/cartSlice';

const ProductItem = (props) => {
  const { title, price, description, id } = props;
  const dispatch = useDispatch();

  const addToCartHandle = () => {
    dispatch(cartActions.addtoCart({
      id: id,
      title : title,
      price  : price ,

    }))
    console.log("add to cart handler",id,title,price);
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandle}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
