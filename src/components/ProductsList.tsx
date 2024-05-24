import { FC, useEffect, useState } from 'react';
import { Grid, styled } from '@mui/material';
import axios from 'axios';
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
import { ProductForm } from './ProductForm';

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
    axios.get('http://localhost:4000/products') // axios.<nazwa_metody_http> wykonuje zapytanie http na podany mu adres
      // axios.get zwraca Promise
      .then((response) => {
        // .then() jest metoda, ktora mozemy wywolywac na Promise
        // jej argumentem jest funkcja (callback)
        // w .then() wejdziemy jesli axios.get nie rzuci nam zadnym bledem
        // wtedy mozemy zareagowac i obsluzyc otrzymany z backendu response
        // response sklada sie z kilku pol, najwazniejsze z nich to: status (kod http, np 200 lub 201), statusMessage, data
        // data to sa nasze dane, ktore z backendu powinnismy otrzymac
        // w tym wypadku, chcemy ustawic to data jako nasz stan komponentu (products)
        // nie musimy, wiec robic nic wiecej poza ustawieniem tego stanu za pomoca setProducts
        setProducts(response.data);
      })
      .catch((err) => console.log(err));
    // catch wywola sie kiedy nasz axios.get zwroci Error
    // wtedy nasz .then zostanie pominiety, a program zacznie wykonywac kod zawarty w .catch
    // jako argument rowniez przyjmuje funkcje, a argumenetem tej funckji jest error
    // mozemy rzucic console.log, albo np wyswietlic to jakos userowi.

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
      <ProductForm/>
    </Container>
  );
};

/* PRACA DOMOWA -- zostaje ta sama
1. Przeczytac o fomularzach https://kursjs.pl/kurs/formularze/formularze
2. Zapoznac sie z dokumentacja react-hook-form https://react-hook-form.com/get-started
3. Stworzyc ekran dodawania produktu (bez wysylania, sam formularz) *
4. Stworzyc repozytorium pod frontend i dodac do niego to co mamy do tej pory DONE
*/
