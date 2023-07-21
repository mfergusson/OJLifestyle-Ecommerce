import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { formattedTotalPrice } from '../utils/formatPrice';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Button from '@mui/material/Button';

interface Product {
  name: string;
  description: string;
  price: number;
  productMaterial: string;
  department: string;
  image: string;
}

interface Props {
  initialProducts: Array<Product>;
  filterParam: string;
  state: any;
  actions: any;
}

const Basket = ({ state, actions }: Props) => {
  const router = useRouter();

  if (state.items.length === 0) {
    return (
      <PageContainer border={false}>
        <div>You have no items in your basket</div>
        <Button onClick={() => router.push('/home')} variant="contained">Return home</Button>
      </PageContainer>
    )
  }

  const handleMinusQuantity = ({ quantity, price }, i) => {
    if (quantity > 1) {
      actions.decreaseItemQuantity(i, 1)
    } else if (quantity === 1) {
      actions.removeItem(price, i);
    }
  }

  const handlePlusQuantity = ({ id, price, name }) => {
    actions.addItem({ id, name, quantity: 1, price });
  }

  return (
    <PageContainer>
      {state.items.length > 0 && (
        <>
          <Button onClick={() => router.push('/home')} variant="contained">Back to home</Button>
          <StyledHeader variant="h2">Basket</StyledHeader>
          <Items>
            {state.items.map((product, i) => {
              return (
                <BasketItemFlex key={product.name}>
                  <BasketItemInnerFlex>
                    <div>
                      <Typography style={{ 'fontWeight': '500' }} variant='subtitle1' >{product.name}</Typography>
                    </div>
                    <IndividualPriceFlexContainer>
                      <IndividualPriceContainer>
                        <MinusQuantityButton fontSize='medium' onClick={() => handleMinusQuantity(product, i)} />
                        <Typography style={{ 'fontWeight': '300', 'lineHeight': '2' }} variant='subtitle2' >{product.quantity}</Typography>
                        <AddQuantityButton fontSize='medium' onClick={() => handlePlusQuantity(product, i)} />
                        <Typography style={{ 'fontWeight': '300', 'marginLeft': '5px' }} variant='subtitle2' >£{formattedTotalPrice(product.price * product.quantity)}</Typography>
                      </IndividualPriceContainer>
                    </IndividualPriceFlexContainer>
                  </BasketItemInnerFlex>
                </BasketItemFlex>
              )
            })}
          </Items>
          <Typography style={{ 'fontWeight': '300', 'marginLeft': '5px' }} variant='subtitle2' >Total £{formattedTotalPrice(state.subTotalPrice)}</Typography>
        </>
      )}
    </PageContainer>
  )
}

const Items = styled.div`
  margin-bottom: 16px;
`;

const IndividualPriceFlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
`

const AddQuantityButton = styled(AddOutlinedIcon)`
  cursor: pointer;
  background-color: white;
  border-radius: 100px;
  color: blue;
  border: 1px solid blue;
  margin: 0 8px;
`

const MinusQuantityButton = styled(RemoveOutlinedIcon)`
  cursor: pointer;
  background-color: white;
  border-radius: 100px;
  color: blue;
  border: 1px solid blue;
  margin: 0 8px;
`

const IndividualPriceContainer = styled.div`
  display: flex;
  align-items: center;
`

const BasketItemFlex = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`

const BasketItemInnerFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`


const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border: ${({ border }) => border ? '1px solid black' : 'none'};
`

const StyledHeader = styled(Typography)`
  text-align: center;
  font-weight: 500;
  margin-bottom: 20px;
`;

export default Basket;