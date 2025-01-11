import "./App.css";
import { ProductsList } from "./Pages/ProductsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductForm } from "./Pages/ProductForm";
import { ProductPreview } from "./Pages/ProductPreview";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { Dashboard } from "./Pages/Dashboard";
import { Users } from "./Pages/Users";
import { MainLayout } from "./layouts/MainLayout";
import { AssignRole } from "./Pages/AssignRole";
import { UserPreview } from "./Pages/UserPreview";
import { ProtectedAdminRoutes } from "./layouts/ProtectedRoutes";
import { NoAccessPage } from "./Pages/NoAccessPage";
import { ProductEdit } from "./Pages/ProductEdit";
import { ProductDetails } from "./Pages/ProductDetails/ProductDetails";

function App() {
  return (
    <div className="App">
      {/*
        <BrowserRouter> okresla nam ze tutaj otwieramy router z paczki react-router-dom sluzacej do nawigacji
        <Routes> okresla nam ze wszystko co znajduje sie w srodku to nasze sciezki
        <Route> to sciezka- sklada z path (czyli adres w przegladarce, '/' oznacza, pusty route, taki defaultowy) oraz element- jaki element ma sie renderowac kiedy wejdziemyt pod ten adres
       */}

      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProductsList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="product/:id" element={<ProductPreview />} />
          <Route path="/no-access" element={<NoAccessPage />} />
          <Route path="/product-details" element={<ProductDetails />} />

          {/* Protected Routes */}
          
            <Route element={<ProtectedAdminRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="add-product" element={<ProductForm />} />
              <Route path="/assign-role/:id" element={<AssignRole />} />
              <Route path="/user-preview/:id" element={<UserPreview />} />
              <Route path="/edit-product/:id" element={<ProductEdit />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//  Wszystko tutaj jest w kontenerze, ktory ma direction column,
//  czyli wszystko co jest wewnatrz bedzie jedno pod drugim.
//  Jesli np chcialbys dodac filtry po lewej stronie od produktow
//  to musisz zrobic nowy kontener, ktory bedzie mial "flexDirection": "row"
//  Pisanie css'a to jest troche jak tworzenie siatki, co ja polecam, zeby bylo latwiej
//  i zeby wygodniej sledzic to co robisz to ja daje sobie property "border: 1px solid <nazwa_koloru>"
