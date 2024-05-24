import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string, number, date, InferType, mixed } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import  axios from 'axios';
import { TerpenEnum } from '../types/Terpen';

const productSchema = object({
  producentName: string().min(4).max(20).required('this field is required'),
  strainName: string().min(4).max(20).required('This field is required'),
  genetics: string().min(4).max(15).required(),
  terpen: string().required(),
  THC: number().positive().integer().min(1)
    .required(),
  CBD: number().positive().integer().min(1)
    .required()
});

type FormValues = {
    producentName: string,
    strainName: string,
    genetics: string,
    terpen: string,
    THC: number,
    CBD: number
}

export const ProductForm = () => {

  const form = useForm<FormValues>({ resolver: yupResolver(productSchema), mode: 'all' });
  const { register, handleSubmit, formState: { errors } } = form;
  const [selectOptions, setSelectOptions] = useState<{label: string, value: string}[]>([]);

  const mapEnumToOptions = () => {
    const array = Object.keys(TerpenEnum).map((terpen) => (
      {
        label: terpen.toLocaleUpperCase(),
        value: terpen }));

    setSelectOptions(array);
  };
  useEffect(() => {
    mapEnumToOptions();
  }, []);

  /*
  1. Hook useForm moze przyjmowac przeroznce opcje, najwazniejsze z nich:
    - resolver -> czyli funkcja/mechanizm, ktory przyjmuje jakas schema (productSchema). Pozwala to na
    walidacje konkretnych pol w sposob taki jak my to sobie okreslimy. https://www.npmjs.com/package/yup -> dokumnetacja yupa
    tam znajdziesz wszelkie opcje, jak mozemy walidowac inputy
    - mode -> kiedy walidacja ma sie odpalac (opcje zobaczysz po najechaniu), all jest najwygodniejsze
    - defaultValues -> defaultowe wartosci dla formularza
    2. useForm zwraca obiekt, dzieki czemu mozemy go destrukturyzowac. Najwazniejsze elementy, ktore z niego wyciagamy to:
    - register -> funkcja do 'rejestrowania' inputow, mowi ona react-hook-formowi, ze ma kontrolowac ten input
    - handleSubmit -> funkcja do submitowania formularza na podstawie kontrolowanych do niego danych
    - formState -> stan fomularza (taki troche formulrzowy useState), jest obiektem, zawiera w sobie miedzyinnymi co istotne errors
  */

  /*
    1. Zamienic inputy na TextFieldy jesli chodzi o select, w MUI jest cos takiego jak Select https://mui.com/material-ui/react-select/ DONE
    2. Rozbudowac walidacje (np. minimalna dlugosc, maksymalna dlugosc itp) DONE
    3. Przeczytac sobie wiecej o zapytaniach HTTP, glownie metoda POST
    */

  /*
    1. Przeczytac o tym czym jest node.js i jak dziala
    2. Przeczytac sobie o express.js
    */

  const onSubmit = async(data: FormValues) => {
    console.log('Form submitted', data);
    await axios.post('http://localhost:4000/create-product', {}) // {} => to jest body ( tu dodac body frontend)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <TextField
          label={'Producent name'}
          {...register('producentName')}
          error={!!errors.strainName}
          helperText={errors.strainName ? errors.strainName.message : ''}
        />

        <TextField
          label={'Strain name'}
          {...register('strainName')}
          error={!!errors.strainName}
          helperText={errors.strainName ? errors.strainName.message : ''}
        />
        <TextField
          label={'Genetics'}
          {...register('genetics')}
          error={!!errors.genetics}
          helperText={errors.genetics ? errors.genetics.message : ''}
        />
        {/* <TextField
          label={'Terpen'}
          {...register('terpen')}
          error={!!errors.terpen}
          helperText={errors.terpen ? errors.terpen.message : ''}
        /> */}
        <TextField
          label={'THC'}
          {...register('THC')}
          error={!!errors.THC}
          helperText={errors.THC ? errors.THC.message : ''}
        />
        <TextField
          label={'CBD'}
          {...register('CBD')}
          error={!!errors.CBD}
          helperText={errors.CBD ? errors.CBD.message : ''}
        />
        <Select
          {...register('terpen')}
          label='Terpen'
          placeholder='Terpen'
          fullWidth
        >
          {selectOptions.map((option) =>
            (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            )
          )}
        </Select>

        <button>Add product</button>
      </form>
    </div>
  );
};
