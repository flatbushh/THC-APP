import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

//DEFINING GENERIC TYPE
type FormTextfieldProps< //celem tego typu jest okreslenie typu argumentów dla useCOTNROLLER PROPS
  // typ dla propsa jaki ten komponent akceptuje
  TFieldValues extends FieldValues = FieldValues, //przypisanie defaultowe wartosci 
  //FieldValues - typ genryczny z RHF, reprezentuje obiekt z polami, typ danych jaki przyjmuje formularz np {producentName: string},zawiera wszystkie pola i ich wartości
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues> 
  //FieldPath - typ generyczny z RHF, makes sure that Tname is one of the keys (nazwa pola) from forms state, okreslony w TFieldValues
> = UseControllerProps<TFieldValues, TName> & TextFieldProps; 
//UseControllerProp - typ z RHF, describes the properties needed by the useController hook to manage the form field state (np name, control), props for controlling the form field
//TextFieldProps - typ z MUI, props you would normally pass to a TextField, such as label, variant, fullWidth

//(P) czy typ name pochodzi z Tname czy UseControllerProps, tak samo control, czy pochodzi z TFieldValues czy z UseControllerProps

//(P) co oznaczają i po co są "=" ?
export const FormTextfield = <
  TFieldValues extends FieldValues = FieldValues, 
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name, //to connect the input field to the form state.
  control,
  fullWidth = true, //control object from useForm that manages the form state
  ...props ////The rest of the props that are not name, control, or id will be collected into props. (P) Po co nam on skoro destrukturyzujemy name i control ktore sa potrzbne`?
}: //The FormTextfield component is designed to accept both the useController properties (like name, control) as well as any other props that are relevant to the Material UI TextField (like label, variant, fullWidth, etc.).
//(P) Czyli są to propsy destrukturyzowane z typów --> UseControllerProps<TFieldValues, TName> & TextFieldProps?

FormTextfieldProps<TFieldValues, TName>) => {
  //USAGE OF GENERIC TYPE
  /* */
  const {
    //to co hook zwraca
    fieldState: { error, invalid },
    field: { value, onBlur, onChange },
  } = useController({ name, control }); // (P) argument hooka, wartości przekazywane z ProductEdit z komponentu <FormTextField/>?

  // const { fieldState, field } = useController({ name, control });
  // const { error, invalid } = fieldState;
  // const { value, onChange, onBlur } = field;

  return (
    <TextField
      {...props} //used to pass all the props collected from the parent component to the TextField component.
      //This includes any props like label, variant, fullWidth, etc., that were passed down to FormTextfield.
      onChange={onChange}
      onBlur={onBlur}
      value={value !== null ? value : ""}
      error={invalid}
      fullWidth={fullWidth}
      helperText={invalid && error?.message && error.message} //property z textfieldu MUI
    />
  );
};

//https://react-hook-form.com/docs/usecontroller
//https://react-hook-form.com/docs/useform/register
//https://www.geeksforgeeks.org/controlled-vs-uncontrolled-components-in-reactjs/


//UseControllerProps -- name i control
// TextFieldProps -- label, id , fullwidth, variant, onBlur, onChange