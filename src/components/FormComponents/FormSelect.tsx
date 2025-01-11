import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> &
  SelectProps & { options: { label: string; value: string }[] };

export const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  id,
  options,
  ...props
}: FormSelectProps<TFieldValues, TName>) => {
  /* */
  const {
    fieldState: { error, invalid },
    field: { value, onBlur, onChange },
  } = useController({ name, control });

  return (
    <FormControl error={invalid} fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        {...props}
        labelId={id}
        name={name}
        fullWidth
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && invalid && (
        <FormHelperText error>{error?.message}</FormHelperText>
      )}
    </FormControl>
  );
};
