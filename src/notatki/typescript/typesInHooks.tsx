import { useState } from 'react';

const TypeInHooks = () => {
  const [name, setName] = useState<string>();

  /* useState jest pod spodem funkcja, ktora ma taki typ: useState<undefined>();
    <> te tagi oznaczaja, ze jest to typ generyczny, czyli moze przyjac jakis typ (w przypadku useState defaultowo jest to undefined)

    1. const [name, setName] = useState();
    pusty use state nie jest inicjowany, co oznacza, ze defaultowo name jest typu undefined- nie okreslismy jakiego typu.

    2. const [name, setName] = useState('')
    ten useState zostal zainicjowany stringiem, wiec jak najedziemy myszka to edytor podpowie nam, ze typ name to string
    * to jest najczestsza forma

    3. const [name, setName] = useState<string>()
    ten useState ma okreslony typ jako string, natomiast nie zostal zainicjowany zadna wartoscia
    w zwiazku z tym mimo tego, ze okresismy ten typ to jak najedziemy myszka na name to typ bedzie jako string | undefined

    z reguly tego zapisu uzywamy przy zlozonych wartosciach, czyli np kiedy w naszym state typem jest jakis obiekt
    type UserType = {
        name: string
        age: number
        gender: string
    }
    const [user, setUser] = useState<UserType>()
    const [user, setUser] = useState({name: '', age: 0, gender: ''})
    */

  return (
    <div></div>
  );
};
