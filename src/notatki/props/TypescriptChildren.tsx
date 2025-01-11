// z dedstrukturyzacja
export const TypescriptChildren = ({ name, age }: {name: string, age: number}) => {
  /* destrukturyzacja wyzej to jest tak na prawde cos takiego, ale w skroconym zapisie:
    const {name, age} = props;
    */
  return (
    <>
      <div>{name}</div>
      <div>{age}</div>
    </>
  );
};

// bez destrukturyzacji
export const TypescriptChildren2 = (props: {name: string, age: number}) => {

  return (
    <>
      <div>{props.name}</div>
      <div>{props.age}</div>
    </>
  );
};
