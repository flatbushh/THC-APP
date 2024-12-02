import { createContext, useContext, PropsWithChildren } from "react";
import { Slide, toast, ToastOptions } from "react-toastify";

interface AlertContextType {
  showSuccessAlert: (message: string) => void;
  showErrorAlert: (message: string) => void;
}

//za pomoca createContext tworzymy context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

//konfiguracja toasta z biblioteki (niepowiazane z contextem)
const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000, //1s = 1000ms
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  transition: Slide,
};

// to jest funkcja Provider - dostarcza nam context(patrz dalej w App.tsx)
// sam context jest wrapperem(kontenerem) dla wielu lub jednego dziecka
export const AlertProvider = ({ children }: PropsWithChildren) => {
  const showSuccessAlert = (message: string) => {
    toast.success(message, defaultToastOptions);
  };

  const showErrorAlert = (message: string) => {
    toast.error(message, defaultToastOptions);
  };

  // zwracamy Provider, ktory jako wartosc przyjmuje dwie funkcje, ktore napisalismy.
  return (
    <AlertContext.Provider value={{ showSuccessAlert, showErrorAlert }}>
      {children}
    </AlertContext.Provider>
    //props {children}, mogę app.tsx wrapowac z alertocontext.provider ale wymagaloby to wiecej importow w app.tsc orac wyrzucenie funkcji na zewnatrz oddzielnie dwoch i przekazanie
  );
};

//to jest hook do uzywania contextu w komponencie (dowolnym) --> CONSUMER(useContext)
//odpala on useContext z tym contextem a jesli sypnie bledem to znaczy, ze
// komponent w ktorym chcemy go uzyc nie jest owrappowany contextem;
export const useAlertContext = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    //context === undefined
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};

// 1. createContext
// 2. wrap with provider passing the value={data}
// 3. consume context by using useContext
// 4. hook po to by ominąć undefined, jakby sktos zapomnial owrapowac providerem komponent to dostaniemy wtedy error
