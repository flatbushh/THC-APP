import { FC } from 'react';

type MyType = {
    age: number
    name: string
}

export const ComponentWithFC:FC<MyType> = () => {

  /* FC to typ generyczny z Reacta, ktorego rozwiniecie brzmi FunctionalComponent

    wyglada on tak:
    interface FunctionComponent<P = {}> {
        (props: P, context?: any): ReactNode;
        propTypes?: WeakValidationMap<P> | undefined;
        contextTypes?: ValidationMap<any> | undefined;
        defaultProps?: Partial<P> | undefined;
        displayName?: string | undefined;
    }

    oznacza to, ze jest to interface ktory przyjmuje argument w postaci typu, okreslaja to te nawiasy: <>
    jednoczesnie uzycie tych nawiasow bezposrednio za nazwa typu okresla, ze jest to typ generyczny

    typ generyczny to typ, ktory moze przyjac argument, tak samo jak funkcja
    z ta roznica ze funkcja jako argument dostaje jakas wartosc, a typ generyczny jako argument dostaje inny typ

    nasz wlasny prostszy FC:

    interface FunctionComponent<P> {
        data: P
        id: string
    }
    P - to jest nasz argument, jest to nazwa wlasna, mozna uzyc P lub jakiejkolwiek innej litery ( z reguly uzywa sie T = typ)
    data:P - to oznacza, ze data w naszym typie bedzie tego typu jaki przekazalismy

    type MyPType = {
        age: number
        name: string
    }

    const data: FunctionComponent<MyPtype> = {
        data: {
            age: 20,
            name: 'Joe'
        }
        id: '1234'
    }

    typy generyczne pozwalaja nam na dynamiczne typowanie, czyli typowanie wlasnosci typu (takich jak data)
    w zaleznosci od sytuacji, w ktorej go uzywamy
    */
  return (
    <div></div>
  );

};
