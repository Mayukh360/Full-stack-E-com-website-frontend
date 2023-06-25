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
         <Button  onClick={props.onRemove} variant="danger" style={{border:'1px solid black'}} >Delete</Button>{' '}
         <Button onClick={props.onAdd} variant="success" style={{border:'1px solid black'}}>Increase</Button>{' '}
         <Button onClick={props.onDecrease} variant="warning" style={{border:'1px solid black'}}>Decrease</Button>{' '}
      </div>
    </li>
  );
};

export default CartItem;