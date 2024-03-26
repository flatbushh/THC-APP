import SpaIcon from '@mui/icons-material/Spa';
import { TerpenEnum } from '../types/Terpen';

export const switchTerpenIcon = (terpenType: TerpenEnum) => {
  // eslint-disable-next-line default-case
  switch (terpenType) {
  case TerpenEnum.LIMONEN:
    return (
      <SpaIcon sx={{ color: 'yellow' }}/>
    );

  case TerpenEnum.CARIOPHILEN:
    return (
      <SpaIcon sx={{ color: 'green' }}/>

    );

  case TerpenEnum.MIRCEN:
    return (
      <SpaIcon sx={{ color: 'purple' }}/>

    );
  }
};
