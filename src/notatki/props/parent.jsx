import { Children } from './children';

const Parent = () => {
  return (
    <>
      <Children name='Tom' age={20}/>
      {/*
      kazda wartosc, ktora przekazujemy do dziecka jest propsem
      w taki sposob jak jest to zapisane wyzej to tak na prawde jakbysmy przekazali
      obiekt o takiej strukturze:

      const props = {
        name: 'Tom'
        age: 20
      }

      <Children props={props} />

      Dlatego potem w dziecku, jesli chcemy odwolac sie do wartosci, ktore przekazalismy
      w rodzicu musimy robic props.<nazwa_wartosci> (np. props.age)
      jesli chcialbys w naszym przykladzie w komponencie Children wyswietlic props.gender to dostalbys undefined,
      poniewaz nie przekazujesz go
      */}
      <Children name='Joe' age={22}/>
    </>
  );
};
