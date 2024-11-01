import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from './components/Container';
import { ProductsList } from './Pages/ProductsList';
import { ContainerFiltr } from './components/ContainerFiltr';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductForm } from './Pages/ProductForm';
import {ProductPreview} from './Pages/ProductPreview'
import { Register } from './Pages/Register';
import { Login } from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import { AlertProvider } from './context/AlertContext';
import { Dashboard } from './Pages/Dashboard'
import { Users } from './Pages/Users';
import { Drawer } from './components/Drawer/Drawer';
import { MainLayout } from './layouts/MainLayout';

function App() { 

  return (
    <div className='App'>
      <div className='x'>
        {/*
        <BrowserRouter> okresla nam ze tutaj otwieramy router z paczki react-router-dom sluzacej do nawigacji
        <Routes> okresla nam ze wszystko co znajduje sie w srodku to nasze sciezki
        <Route> to sciezka- sklada z path (czyli adres w przegladarce, '/' oznacza, pusty route, taki defaultowy) oraz element- jaki element ma sie renderowac kiedy wejdziemyt pod ten adres
        */}
       <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductsList />}/>
           
           <Route element={<MainLayout/>}>
              <Route path="dashboard" element={<Dashboard/>}/>
              <Route path="users" element={<Users/>}/>
              <Route path='add-product' element={<ProductForm />}/>
           </Route>
              
            
           
            
            <Route path="product/:id" element={<ProductPreview/>}/>
           
            <Route path="register" element={<Register/>}/>
            <Route path="login" element={<Login/>}/>
            
          </Routes>
        </BrowserRouter>
        </AlertProvider>
   
        {/*
          Wszystko tutaj jest w kontenerze, ktory ma direction column,
          czyli wszystko co jest wewnatrz bedzie jedno pod drugim.
          Jesli np chcialbys dodac filtry po lewej stronie od produktow
          to musisz zrobic nowy kontener, ktory bedzie mial "flexDirection": "row"
          Pisanie css'a to jest troche jak tworzenie siatki, co ja polecam, zeby bylo latwiej
          i zeby wygodniej sledzic to co robisz to ja daje sobie property "border: 1px solid <nazwa_koloru>"
          */}
      <ToastContainer/>
      </div>
    </div>
  );
}

export default App;
