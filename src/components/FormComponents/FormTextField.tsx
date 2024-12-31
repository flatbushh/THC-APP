import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

type FormTextfieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & TextFieldProps;

export const FormTextfield = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  id,
  ...props
}: FormTextfieldProps<TFieldValues, TName>) => {
  const {
    fieldState: { error, invalid },
    field: { value, onBlur, onChange },
  } = useController({ name, control });

  return (
    <TextField
      {...props}
      onChange={onChange}
      onBlur={onBlur}
      value={value !== null ? value : ""}
      error={invalid}
      helperText={invalid && error?.message && error.message}
    />
  );
};

//https://react-hook-form.com/docs/usecontroller
//https://react-hook-form.com/docs/useform/register
//https://www.geeksforgeeks.org/controlled-vs-uncontrolled-components-in-reactjs/
