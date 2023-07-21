import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { formattedTotalPrice } from '../utils/formatPrice';
import { useRouter } from 'next/router';

const ProductCard = ({ state, actions }: any) => {
  const router = useRouter();

  return (
    <FooterContainer>
      <Footer>
        <StyledButton onClick={() => router.push('/basket')}>
          <FooterButtonFlex>
            <FooterButtonInnerFlex>
              <div>{state.items.length} Item{state.items.length > 1 ? 's' : ''}</div>
              <div>View Basket</div>
              <div>£{formattedTotalPrice(state.subTotalPrice)}</div>
            </FooterButtonInnerFlex>
          </FooterButtonFlex>
        </StyledButton>
      </Footer>
    </FooterContainer>
  )
}

const FooterButtonFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const FooterButtonInnerFlex = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const StyledButton = styled.button`
  border-radius: 10px;
  box-shadow: none;
  text-transform: none;
  cursor: pointer;
  font-weight: 700;
  width: 100%;
  height: 45px;
  color: white;
  padding: 6px 24px;
  font-size: 14px;
  background-color: #1976d2;
  &:hover {
    background-color: blue;
  }
`;

const FooterContainer = styled.div`
  position: sticky;
  bottom: 10px;
  width: 90%;
`;

const Footer = styled.div`
  position: sticky;
  left: 0;
  bottom: 0;
  border-top: 1px solid #c0c0c0;
  box-shadow: 0px -1px 4px rgb(0 0 0 / 20%);
  background-color: white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
`


export default ProductCard;
