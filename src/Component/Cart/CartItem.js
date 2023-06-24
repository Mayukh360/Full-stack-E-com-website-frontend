import classes from './CartItem.module.css';
import { Button } from 'react-bootstrap';

const CartItem = (props) => {
  const price = `${props.price}₹`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h4>{props.name}</h4>
        <img src={props.image} alt={props.name} className={classes.image} />
        
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div >
         <Button  onClick={props.onRemove} variant="danger">Delete</Button>{' '}
         <Button onClick={props.onAdd} variant="success">Increase</Button>{' '}
         <Button onClick={props.onDecrease} variant="warning">Decrease</Button>{' '}
      </div>
    </li>
  );
};

export default CartItem;