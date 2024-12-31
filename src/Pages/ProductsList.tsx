import { FC, useEffect, useState } from "react";
import { Box, Button, Grid, styled } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { TerpenEnum } from "../types/Terpen";
import { Container } from "../components/Container";
import { ProductDrawer } from "../components/ProductDrawer";
import { GeneticsEnum } from "../types/GeneticsEnum";
import { Spinner } from "../components/Spinner";
import React from "react";
import { Drawer } from "../components/Drawer/Drawer";

const CardContainer = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: 30,
  flexWrap: "wrap",
  gap: "50px 20px",
  ...(open && {
    transition: theme.transitions.create("margin", {
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
  genetics: GeneticsEnum;
  thcLevel: number;
  cbdLevel: number;
  image: string;
  terpen: TerpenEnum;
  description: string;
};

export type FiltersType = {
  producentName: string | null;
  genetics: GeneticsEnum | null;
  terpen: TerpenEnum | null;
  thcLevel: number[] | null;
  cbdLevel: number[] | null;
};
export type FilterTypeKeys = keyof FiltersType;
// type FilterTypeKeys = 'producentName' | 'genetics' | 'thcLevel' | 'cbdLevel'

export const ProductsList: FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({
    producentName: null,
    genetics: null,
    thcLevel: null,
    cbdLevel: null,
    terpen: null,
  });
  const [loading, setLoading] = useState(false);

  /* ten useState przyjmuje FilterType jako argument do typu generycznego useState'a ,
    wiec jak zmienimy typ to automatycznie bedzie wymagal dodania tego nowego podczas inicjowania
  */

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const filterElements = (
    key: FilterTypeKeys,
    value: string | number | number[] | GeneticsEnum
  ) => {
    if (key === "producentName") {
      setFilters((prev) => ({
        ...prev,
        producentName: (value as string).length >= 1 ? (value as string) : null,
      }));
    }

    let newValue: string | number | number[] | GeneticsEnum | TerpenEnum | null;

    if (key === "genetics") {
      newValue = value === filters.genetics ? null : value;
    } else if (key === "terpen") {
      newValue = value === filters.terpen ? null : value;
    } else {
      newValue = value;
    }

    setFilters((prev) => ({
      ...prev,
      [key]: newValue,
    }));
    /* setFilters((prev) => ({
      ...prev, // destrukturyzujemy caly obecny state
      [key]: value // => np: genetics: value
      nie mozemy zapisac key: value, poniewaz wtedy 'key' bedzie potraktowane jako nazwa klucza
      uzycie nawiasow kwadratowych spowoduje, ze odwolamy sie do wartosci key (czyli np 'genetics')
    }))
    */
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  // const filterProducts = (value: string) => {
  //   setTimeout(() => {
  //     setFilters((prev) => ({ genetics: prev.genetics,
  //       thcLevel: prev.thcLevel,
  //       cbdLevel: prev.cbdLevel,
  //       producentName: value.length >= 1 ? value :  null }));
  //   }, 2000);
  // };

  // const filterGenetics = (value: GeneticsEnum) => {
  //   setFilters((prev) => ({
  //     producentName: prev.producentName,
  //     genetics: value === prev.genetics ? null : value,
  //     thcLevel: prev.thcLevel,
  //     cbdLevel: prev.thcLevel,
  //   }));
  // };

  // const filterTHCLevel = (value: number | number[]) => {

  //   const newValue = Array.isArray(value) ? value : null;
  //   setFilters((prev) => ({
  //     producentName: prev.producentName,
  //     genetics: prev.genetics,
  //     thcLevel: value === 0 ? null : newValue,
  //     cbdLevel: prev.thcLevel }));
  // };

  // const filterCBDLevel = (value: number | number[]) => {
  //   const newValueTwo = Array.isArray(value) ? value : null;
  //   setFilters((prev) => ({
  //     producentName: prev.producentName,
  //     genetics: prev.genetics,
  //     cbdLevel: value === 0 ? null : newValueTwo,
  //     thcLevel: prev.thcLevel }));
  // };
  /* to jest funkcja, ktora filtruje produkty
    dla kazdego innego filtru musisz zrobic podobna funkcje, tylko edytwac odpowiedni filtr
    co jest istotne, zadbaj o to, zeby jak np zmieniasz CBD to nie usunac jednoczesnie producentName
    https://blog.logrocket.com/accessing-previous-props-state-react-hooks/

    jak to zrobisz i bedziesz wysylac odpowiednie body w requescie to musisz jeszcze cos zrobic z tymi danymi na backendzie
  */

  useEffect(() => {
    setLoading(true);

    axios
      .post("http://localhost:4000/products", filters) // axios.<nazwa_metody_http> wykonuje zapytanie http na podany mu adres
      // axios.get zwraca Promise
      .then((response) => {
        setProducts(response.data);
        // .then() jest metoda, ktora mozemy wywolywac na Promise
        // jej argumentem jest funkcja (callback)b
        // w .then() wejdziemy jesli axios.get nie rzuci nam zadnym bledem
        // wtedy mozemy zareagowac i obsluzyc otrzymany z backendu response
        // response sklada sie z kilku pol, najwazniejsze z nich to: status (kod http, np 200 lub 201), statusMessage, data
        // data to sa nasze dane, ktore z backendu powinnismy otrzymac
        // w tym wypadku, chcemy ustawic to data jako nasz stan komponentu (products)
        // nie musimy, wiec robic nic wiecej poza ustawieniem tego stanu za pomoca setProducts
        //setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        //setLoading(false)
      });
    // catch wywola sie kiedy nasz axios.get zwroci Error
    // wtedy nasz .then zostanie pominiety, a program zacznie wykonywac kod zawarty w .catch
    // jako argument rowniez przyjmuje funkcje, a argumenetem tej funckji jest error
    // mozemy rzucic console.log, albo np wyswietlic to jakos userowi.
  }, [filters]);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  return (
    <Container>
      {loading && <Spinner />}
      {/* loading && <Spinner/>  (loading === true return SPinner otherwise null*/}
      {/* false zainicjowane w useState nie ma znaczenia, bo setLoading zmienia wartość loading w zaleności od potrzeby */}
      <ProductDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        selectedGenetics={filters.genetics}
        selectedTerpen={filters.terpen}
        filterElements={filterElements}
        products={products}
        setProducts={setProducts}
      />

      <CardContainer open={open}>
        {products.length < 1 && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No products found
          </Box>
        )}
        {products.map((product, index) => {
          return <ProductCard product={product} key={index} />;
        })}
      </CardContainer>
      <Button variant="contained" onClick={() => navigate("/add-product")}>
        Add product
      </Button>
    </Container>
  );
};
