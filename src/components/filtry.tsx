import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const Filtry:FC = () => {

  return (
    <div>

      <div className="producentFiltr">

        <div className="producent">Producent
          <Button className="buttonfirst" color="secondary"><AddIcon/></Button>
        </div>

        <div>
          <div>
            <ul>
              <li>Aurora</li>
            </ul>
          </div>
        </div>

      </div>

      <div className="geneticsFIltr">

        <div className="genetics">Genetics
          <Button color="secondary"><AddIcon/></Button>
        </div>
        <div>
          <div>
            <ul>
              <li>Sativa</li>
              <li>Indica</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="THCFiltr">

        <div className="THC">THC level
          <Button color="secondary"><AddIcon/></Button>
        </div>
        <div>
          <div>
            <ul>
              <li>1 -10</li>
              <li>11 - 20</li>
              <li>21 -30</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="TerpensFiltr">

        <div className="terpens">Terpens
          <Button color="secondary"><AddIcon/></Button>
        </div>

        <div>
          <div>
            <ul>
              <li>Limonen</li>
            </ul>
          </div>
        </div>

      </div>
    </div>

  );
};
