export /*
1. Dodac filtr dla terpenow => zostaly style do ogarniecia DONE
2. Zrobic ProductPreview (obsluzyc dane, ktore pobieramy i wyswietlic je w przystepny dla uzytkownika sposob)
3. Zrobic rejestracje
    - Zrobic nowa podstrone Register DONE
    - Zrobic formularz rejestracji (z walidacja: email, haslo, powtorz haslo)
    - Zrobic nowy endpoint na backendzie do rejestracji ( z zapisem uzytkownika do bazy)
    - Spiac front i backend
    - ma to jakos wygladac
    - w pasku gornym strony, lub w jakims menu powinien byc jakis odnosnik z przekierowaniem do register
    - Zrobic szyfrowanie hasla na backendzie*
    - napisac do tego test jednostkowy*

1. Dodac filtr dla terpenow
2. Zrobic ProductPreview (obsluzyc dane, ktore pobieramy i wyswietlic je w przystepny dla uzytkownika sposob)
3. Zrobic rejestracje
    - Zrobic nowa podstrone Register
    - Zrobic formularz rejestracji (z walidacja: email, haslo, powtorz haslo)
    - Zrobic nowy endpoint na backendzie do rejestracji ( z zapisem uzytkownika do bazy)
    - Spiac front i backend
    - Zrobic szyfrowanie hasla na backendzie*
4. Zrobic logowanie
    - Zrobic nowa podstrone Login
    - Zrobic formularz logowania (z walidacja)
    - Zrobic nowy endpoint na backendzie do logowania (sprawdzanie credentials)
    - Zrobic autentykacje JWT* (json web token - poczytac, "how to use jwt with node and react")
5. Zrobic ProtectedRoutes, czyli podstrony tylko dla zalogowanych uzytkownikow
*/
/* 
    - Zrobic autentykacje JWT*
5. Zrobic ProtectedRoutes, czyli podstrony tylko dla zalogowanych uzytkownikow
*/
/*
Plan dzialania:
1. Na kazde zadanie tworzymy oddzielny branch gita (git checkout -b <moja_nazwa_brancha> np: create-register)
2. Po zrobieniu kazdego zadania robimy pull request
3. Jak mamy approve to robimy merge
*/ {};

/*
1. Musimy przesunac AddProduct do ekranu po zalogowaniu DONE bez JWT
    - Musze stworzyc dashboard (nowa podstrona) DONE
    - bedzie ona zablokowana tylko dla zalogowanych uzytkownikow* (JWT)
    - tutaj musimy przesunac nasza podstrone(juz nie tylko button) add product (tez zablokowane) DONE
2. Userzy.
    - musimy zrobic nowy endpoint do pobierania wszystkich userow
    - musimy zrobic nowa podstrone Users i dodac ja w Routerze oraz Menu Drawera DONE
    - Na podstronie Users powinna znajdowac sie tabela, ktora wyswietla nam wszystkich userow i ich podstawowe dane (mozesz uzyc DataGrid z MUI,
        https://mui.com/x/react-data-grid/)
3. Musimy zrobic role
    - dwie role - admin/client
    - musza byc przechowywane w bazie danych i dodawane do recordu usera 
    - na tej podstawie bedziemy wiedzieli jakie strony mozna wyswietlic komu
    - defaultowo przypisywany bedzie client
    howto:
    1. Dodajemy nowe pole do Usera na poziomie backandu -> role. Jest to Enum, ktory zawiera ADMIN i CLIENT
    2. Musimy zmienic register na backendzie. Z defaultu (nie jest to wysylane w zaden sposob z frontu) do 
    recordu User'a dodajemy pole role z wartosciowa CLIENT (enum z punktu 1.)
    3. Robimy nowy endpoint o nazwie 'assign-role/:id', gdzie :id jest id usera, ktoremu zmieniamy role.
        - w body requestu musimy przekazac informacje o roli, ktora chcemy przypisac userowi
        - wykonujemy request do bazy gdzie podmieniamy poprzednia role na ta wyslana w req.body
    --------------------------------------------------------------------------------------------
    4. Na froncie robimy nowa podstrone '/assign-role' DONE
        - mamy do wyboru dwie role (nie moze miec przypisanych dwoch jednoczesnie, DONE
            oraz nie moze wybrac tej, ktora juz aktualnie ma przypisana): ADMIN i CLIENT (??)
        - wybieramy role, ktora chcemy przypisac i wysylamy request na endpoint z punktu 3. DONE
        -* powinnismy zaznaczyc w jakis sposob (np MUI Badge, albo kolorem jakkolwiek), ktora role aktualnie posiada user (zrobić nową kolumnę w datagrid w users gdzie bedzie wyswietlany badge?)
        - po zmianie tej roli, powinnismy pobrac jeszcze raz dane usera i zaznaczyc nowa wybrana jako aktualna ???
        - wysylanie requestu musi uwzgledniac obsluge bledow (nasze alert context) DONE
        sugestia: wykorzystac do stworzenia tego MUICard, powinien byc jakis header, a do wyboru roli moga nam posluzyc:
        Button, Checkbox, Switch ktore najbardziej Ci pasuje
    5. W tablie Users powinny byc dwa przyciski:
        a). Przekierowanie do /assign-role strony z punktu 4 DONE
    --------------------------------------------------------------------------------------------
        b). UserPreview -> nowa podstrona z podgladem usera DONE
            - ma wyswietlac dane usera, ktore posiadamy (poszukaj na dribble.com) DONE
            (1. stworzyłem endpoint na backendzie
            2. stworzylem MuiCard wyswietlajacy id email i rolę usera)
    6. Zrobic ProtectedAdminRoute
        - guard na route, ktory pozwala tylko adminowi na odwiedzenie strony
        - To jest wrapper pod react-router-dom, ktory w jakis sposob musi walidowac Twoja role i na jej podstawie zwracac
        albo strone, ktora chcesz zobaczyc, albo nowa podstrone: NoAccessPage (zwykla statyczna strona z informacja, ze nie 
            masz dostepu)


*********
later:
podglad usera, sledzenie historii edycji produktu od jego stworzenia;
        */
