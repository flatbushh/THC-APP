import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from './components/Container';
import { ProductsList } from './components/ProductsList';
import { ContainerFiltr } from './components/ContainerFiltr';
import { Filtry } from './components/filtry';

function App() {

  return (
    <div className='App'>
      <div className='x'>

        {/* <ContainerFiltr>
          <Filtry></Filtry>
        </ContainerFiltr> */}

        <ProductsList></ProductsList>
        {/*
          Wszystko tutaj jest w kontenerze, ktory ma direction column,
          czyli wszystko co jest wewnatrz bedzie jedno pod drugim.
          Jesli np chcialbys dodac filtry po lewej stronie od produktow
          to musisz zrobic nowy kontener, ktory bedzie mial "flexDirection": "row"
          Pisanie css'a to jest troche jak tworzenie siatki, co ja polecam, zeby bylo latwiej
          i zeby wygodniej sledzic to co robisz to ja daje sobie property "border: 1px solid <nazwa_koloru>"
          */}

      </div>
    </div>
  );
}

export default App;
