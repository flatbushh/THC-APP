import { styled } from '@mui/material';
import { PropsWithChildren } from 'react';

// https://mui.com/system/styled/
// https://www.w3schools.com/css/css_padding.asp

export const CardsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: 30,
  flexWrap: 'wrap',
  gap: '50px 20px',

});

//to samo z uzyciem children jak wykorzystac
const Container = ({children}: PropsWithChildren) => {
  return (
    <div style={{
      display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30,
    flexWrap: 'wrap',
    gap: '50px 20px'}}>
      {children}
    </div>
  )

}