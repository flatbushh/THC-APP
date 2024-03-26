import { FC, useEffect, useState } from 'react';
import { Grid, styled } from '@mui/material';
import { MuiCard } from './Card';
import image2 from '../fotki/aurora201.png';
import image3 from '../fotki/aurorazielona.png';
import image4 from '../fotki/delehaze.png';
import image5 from '../fotki/goryl.png';
import image6 from '../fotki/redno.png';
import image7 from '../fotki/canopy.png';
import image8 from '../fotki/canpy2.png';
import image9 from '../fotki/pinkkush.png';
import { TerpenEnum } from '../types/Terpen';
import { Container } from './Container';
import { ProductDrawer } from './Drawer';

export const STATIC_PRODUCTS = [
  { id: 1, producentName: 'Aurora', strainName: 'L.A. Confidential', genetics: 'indica', thcLevel: 22, cbdLevel: 1, image: image2, terpen: TerpenEnum.LIMONEN },
  { id: 2, producentName: 'Aurora', strainName: 'Equiposa', genetics: 'sativa', thcLevel: 22, cbdLevel: 5, image: image3, terpen: TerpenEnum.CARIOPHILEN },
  { id: 3, producentName: 'Aurora', strainName: 'Ghost Train Haze', genetics: 'sativa', thcLevel: 20, cbdLevel: 2, image: image4, terpen: TerpenEnum.MIRCEN },
  { id: 4, producentName: 'Spectrum', strainName: 'Lemon Skunk', genetics: 'sativa', thcLevel: 17, cbdLevel: 5, image: image6, terpen: TerpenEnum.LIMONEN },
  { id: 5, producentName: 'Canopy Growth', strainName: 'Master Kush', genetics: 'sativa', thcLevel: 20, cbdLevel: 5, image: image7, terpen: TerpenEnum.LIMONEN },
  { id: 6, producentName: 'Canopy Growth', strainName: 'Mango', genetics: 'Indica', thcLevel: 18, cbdLevel: 1, image: image8, terpen: TerpenEnum.LIMONEN },
  { id: 7, producentName: 'Aurora', strainName: 'Pink Kush', genetics: 'Indica', thcLevel: 18, cbdLevel: 1, image: image9, terpen: TerpenEnum.LIMONEN },
  { id: 7, producentName: 'Four20Pharma', strainName: 'Gorilla Glue', genetics: 'Indica', thcLevel: 18, cbdLevel: 1, image: image5, terpen: TerpenEnum.LIMONEN },
];

const CardContainer = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: 30,
  flexWrap: 'wrap',
  gap: '50px 20px',
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export type Product = {
    id: number;
    producentName: string;
    strainName: string;
    genetics: string;
    thcLevel: number;
    cbdLevel: number;
    image: string;
    terpen: TerpenEnum;
    }

export const ProductsList:FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSetProducts = (newProducts:Product[]) => {
    setProducts(newProducts);
  };

  useEffect(() => {
    fetch('http://localhost:4000/products') // to jest metoda http GET sluzaca do pobierania danych
      .then((response) => response.json())
      .then((data) => setProducts(data));
    // setProducts(STATIC_PRODUCTS);
    /* nie dawaj nigdy console.log'a aby sprawdzic czy "set" zadzialal poprawnie
    wewnatrz useEffectu, bo wartosc widoczna jest dopiero po pelnym wykonaniu, wiec tutaj zawsze bedziesz mial
    swoj stan poczatkowy. Daj console.log'a poza useEffectem jesli chcesz to sprawdzic. */
  }, []);

  return (
    <Container>
      <ProductDrawer open={open} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}
        products={products} setProducts={handleSetProducts}/>

      <CardContainer open={open}>
        {products.map((product, index) => {
          return (

            <MuiCard product={product} />

          );
        })}
      </CardContainer>

    </Container>
  );
};

/* PRACA DOMOWA
1. Przeczytac o fomularzach https://kursjs.pl/kurs/formularze/formularze
2. Zapoznac sie z dokumentacja react-hook-form https://react-hook-form.com/get-started
3. Stworzyc ekran dodawania produktu (bez wysylania, sam formularz)
4. Stworzyc repozytorium pod frontend i dodac do niego to co mamy do tej pory
*/
