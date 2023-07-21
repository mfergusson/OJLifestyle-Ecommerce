import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { useState } from 'react';

const ProductCard = ({ product, state, actions, key }) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);

  const handleAddToBasket = ({ id, price, name }) => {
    if (quantity < 1 || quantity > 10) {
      setError(true);
      return;
    }

    const itemStateToPush = {
      id,
      name,
      quantity,
      price,
    };

    actions.addItem(itemStateToPush);
  }

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setQuantity(parseInt(e.target.value));
  }

  return (
    <StyledCard data-testid={'product'} key={key} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={`Product ${product.name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Description variant="body2" color="text.secondary">
            {product.description}
          </Description>
          <Typography variant="body2" color="text.secondary">
            £{product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <StyledCardActions>
        <AddToBasket onClick={() => handleAddToBasket(product)} size="small" variant="contained" color="primary">
          Add to basket
        </AddToBasket>
        <Quantity onChange={handleOnInputChange} value={quantity} max="10" min="1" type='number' />
      </StyledCardActions>
      {error && <Error variant="body2" color="text.secondary">Please enter a value between 1 and 10</Error>}
    </StyledCard>
  )
}

const Error = styled(Typography)`
  color: red;
  margin: 10px 0;
`

const AddToBasket = styled(Button)`
`;

const Quantity = styled.input`
  height: 20px;
  border-radius: 10px;
  padding: 5px;
  width: 90px;
`

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  column-gap: 5px;
`

const Description = styled(Typography)`
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  margin-bottom: 10px;
`;


const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`


export default ProductCard;
