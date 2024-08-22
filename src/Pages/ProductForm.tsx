import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string, number, date, InferType, mixed } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardActionArea, CardContent, Divider, Grid, TextField, Typography, styled } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import  axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { TerpenEnum } from '../types/Terpen';
import { GeneticsEnum } from '../types/GeneticsEnum';

const productSchema = object({
  producentName: string().min(4).max(20).required('This field is required'),
  strainName: string().min(4).max(20).required('This field is required'),
  genetics: string().min(4).max(15).required(),
  terpen: string().required(),
  thcLevel: number().positive().integer().min(1)
    .required(),
  cbdLevel: number().positive().integer().min(1)
    .required()
});

type FormValues = {
    producentName: string,
    strainName: string,
    genetics: string,
    terpen: string,
    thcLevel: number,
    cbdLevel: number
}

const CustomCard = styled(Card)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '16px',
  padding: 25,
  flexWrap: 'wrap',

});

export const ProductForm = () => {
  const navigate = useNavigate();
  /* przypisujemy hooka useNavigate to zmiennej - jest to funkcja sluzy ona do przekierowania do okreslonej strony
   jako argument przyjmuje jej adres, czyli path okreslony w App.tsx w konkretnym Routcie */

  const [terpenOptions, setTerpenOptions] = useState<{label: string, value: string}[]>([]);
  const [geneticsOptions, setGeneticsOptions] = useState<{label: string, value: string}[]>([]);
  const defaultValues:FormValues = {
    producentName: '',
    strainName: '',
    genetics: GeneticsEnum.INDICA,
    terpen: TerpenEnum.CARIOPHILEN,
    thcLevel: 0,
    cbdLevel: 0
  };
  const form = useForm<FormValues>({ resolver: yupResolver(productSchema), mode: 'all', defaultValues });
  const { register, handleSubmit, formState: { errors } } = form;
  const mapTerpenEnumToOptions = () => {
    const array = Object.keys(TerpenEnum).map((terpen) => (
      {
        label: terpen.toLocaleUpperCase(),
        value: terpen.toLocaleLowerCase() }));

    setTerpenOptions(array);
  };

  const mapGeneticsEnumToOptions = () => {
    const array = Object.keys(GeneticsEnum).map((genetic) => (
      {
        label: genetic.toLocaleUpperCase(),
        value: genetic.toLocaleLowerCase() }));

    setGeneticsOptions(array);
  };

  useEffect(() => {
    mapTerpenEnumToOptions();
    mapGeneticsEnumToOptions();
  }, []);

  /*
  1. Hook useForm moze przyjmowac przeroznce opcje, najwazniejsze z nich:
    - resolver -> czyli funkcja/mechanizm, ktory przyjmuje jakas schema (productSchema). Pozwala to na
    walidacje konkretnych pol w sposob taki jak my to sobie okreslimy. https://www.npmjs.com/package/yup -> dokumnetacja yupa
    tam znajdziesz wszelkie opcje, jak mozemy walidowac inputy
    - mode -> kiedy walidacja ma sie odpalac (opcje zobaczysz po najechaniu), all jest najwygodniejsze
    - defaultValues -> defaultowe wartosci dla formularza
    2. useForm zwraca obinmularza na podstawie kontrolowanych do niego danych
    - formState -> stan fomularza (taki troche formulrzowy useState), jest obiektem, zawiera w sobie miedzyinnymi co istotne errors
  */

  const onSubmit = async(data: FormValues) => {

    await axios.post('http://localhost:4000/create-product', data) // {} => to jest body ( tu dodac body frontend)
      .then(() => {
        navigate('/');
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (

    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%'

    }}>

      <CustomCard>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column' }}>
            <Typography sx={{ margin: '20px', fontFamily: 'BlinkMacSystemFont' }} variant="h4" component="div" gutterBottom>
          Add new product
            </Typography>

            <TextField sx={{ margin: '20px', width: '90%' }}
              label={'Producent name'}
              {...register('producentName')}
              error={!!errors.producentName}
              helperText={errors.producentName ? errors.producentName.message : ''}
            />

            <TextField sx={{ margin: '20px', width: '90%' }}
              label={'Strain name'}
              {...register('strainName')}
              error={!!errors.strainName}
              helperText={errors.strainName ? errors.strainName.message : ''}
            />
            <TextField sx={{ margin: '20px', width: '90%' }}
              select
              label={'Genetics'}
              {...register('genetics')}
              error={!!errors.genetics}
              helperText={errors.genetics ? errors.genetics.message : ''}
            >
            {geneticsOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}

            </TextField>

            <TextField sx={{ margin: '20px', width: '90%' }}
              label={'THC'}
              {...register('thcLevel')}
              error={!!errors.thcLevel}
              helperText={errors.thcLevel ? errors.thcLevel.message : ''}
            />
            <TextField sx={{ margin: '20px', width: '90%' }}
              label={'CBD'}
              {...register('cbdLevel')}
              error={!!errors.cbdLevel}
              helperText={errors.cbdLevel ? errors.cbdLevel.message : ''}
            />
            <TextField sx={{ margin: '20px', width: '90%' }}
              select
              fullWidth
              label="Terpen"
              {...register('terpen')}
              error={!!errors.terpen}
              helperText={errors.terpen?.message}
            >
              {terpenOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Divider sx={{ borderColor: 'black', borderStyle: 'solid' }}/>
            <Box display="flex" gap={2}>

              <Button type='submit' variant="contained" color="success">Add product</Button>
              <Button variant="contained" color="error" onClick={() => navigate('/')}>Cancel</Button>
            </Box>
          </form>
        </CardContent>

      </CustomCard>
    </Box>
  );
};
