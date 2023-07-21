import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { mobile, tablet, desktop } from '../utils/constants/breakpoints';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ProductCard from '../components/ProductCard';
import ViewBasketFooter from '../components/ViewBasketFooter';

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

const Home = ({ initialProducts, filterParam, state, actions }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorFetching, setErrorFetching] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [allProducts, setAllProducts] = useState(initialProducts);
  const [filter, setFilter] = useState(filterParam);
  console.log(initialProducts);

  useEffect(() => {
    switch (filter) {
      case 'low-to-high':
        const lowToHigh = [...filteredProducts].sort((a, b) => a.price >= b.price ? 1 : -1);
        setFilteredProducts(lowToHigh);
        break;
      case 'high-to-low':
        const highToLow = [...filteredProducts].sort((a, b) => a.price <= b.price ? 1 : -1);
        setFilteredProducts(highToLow);
        break;
      case 'alphabetical':
        const alphabetical = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
        setFilteredProducts(alphabetical);
        break;
    }
  }, [filter, filteredProducts])

  const handleScroll = () => {
    if (((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) && !loading) {
      fetchProducts();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setErrorFetching('');

    setTimeout(async () => {
      try {
        const response = await fetch(`http://localhost:8000/data?amount=20`);
        const data = await response.json();

        setFilteredProducts(prevItems => [...prevItems, ...data.body.products]);
        setAllProducts(prevItems => [...prevItems, ...data.body.products]);

      } catch (error) {
        setErrorFetching(error);
      } finally {
        setLoading(false);
      }
    }, 1000)
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const newProducts = allProducts?.filter((product: Product) => {
      if (e.target.value === '') {
        return filteredProducts;
      }

      return product.name.toLowerCase().includes(e.target.value.toLowerCase())
    });

    setFilteredProducts(newProducts)
  }

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  return (
    <PageContainer>
      <StyledHeader variant="h2">Welcome to OJ-Lifestyle E-Commerce store!</StyledHeader>
      <TextField
        fullWidth
        label="Search for a product..."
        variant="outlined"
        margin="normal"
        value={searchValue}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ marginBottom: '10px', width: '100%' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Filter"
            onChange={handleFilterChange}
          >
            <MenuItem value='low-to-high'>Price (Low to high)</MenuItem>
            <MenuItem value='high-to-low'>Price (High to low)</MenuItem>
            <MenuItem value='alphabetical'>Alphabetical</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ProductsWrapper>
        {filteredProducts.map((product: Product) => <ProductCard key={product.name} product={product} state={state} actions={actions} />)}
      </ProductsWrapper>
      {loading && <StyledCircularProgress />}
      {errorFetching && <ErrorTypography variant="h5">Error fetching more results</ErrorTypography>}
      {state.items.length > 0 && <ViewBasketFooter state={state} actions={actions} />}
    </PageContainer>
  )
}

const ErrorTypography = styled(Typography)`
  margin: 20px 0;
`

const StyledCircularProgress = styled(CircularProgress)`
  margin: 20px 0;
`

const ProductsWrapper = styled.div`
  display: inline-grid;
  grid-template-rows: auto;
  grid-template-areas: "header";
  gap: 20px 20px;
  @media ${mobile} {
    grid-template-areas: "header header";
  }
  @media ${tablet} {
    grid-template-areas: "header header header";
  }
  @media ${desktop} {
    grid-template-areas: "header header header header";
  }
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`

const StyledHeader = styled(Typography)`
  text-align: center;
  font-weight: 500;
  margin-bottom: 20px;
`;

interface Query {
  [key: string]: string
}

interface Context {
  query?: Query;
}

export async function getServerSideProps(context: Context) {
  const response = await fetch('http://localhost:8000/data?amount=20');
  const data = await response.json();

  const filterParam = context?.query?.filter ?? '';

  return {
    props: {
      initialProducts: data.body.products,
      filterParam,
    }
  }
}

export default Home;