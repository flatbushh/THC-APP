/* eslint-disable default-case */
import { FC, useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Product } from "../Pages/ProductsList";
import { switchTerpenIcon } from "../utils/switchTerpenIcon";
import { useNavigate } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CustomCard = styled(Card)({
  "&:hover": {
    boxShadow: 20,
  },
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
});

export const ProductCard: FC<{ product: Product }> = ({
  product: {
    id,
    producentName,
    strainName,
    genetics,
    thcLevel,
    cbdLevel,
    image,
    terpen,
  },
}) => {
  const [rating, setRating] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <CustomCard key={id} onClick={() => navigate(`/product/${id}`)}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt="skunks" />

        <CardContent>
          <Typography gutterBottom variant="h5">
            {" "}
            {strainName}{" "}
          </Typography>
          <Typography gutterBottom variant="h6">
            {" "}
            {`${producentName.charAt(0).toUpperCase()}${producentName.slice(
              1
            )}`}{" "}
          </Typography>
          <Typography gutterBottom variant="h6">
            {" "}
            {`${genetics.charAt(0).toUpperCase()}${genetics.slice(1)}`}{" "}
          </Typography>
          <Typography gutterBottom variant="h6">
            {" "}
            THC {thcLevel} CBD {cbdLevel}{" "}
          </Typography>

          <div className="terpeny">
            <div>{switchTerpenIcon(terpen)}</div>
          </div>

          {/*
          <Stack spacing={1} alignContent={'center'} justifyContent={'center'}>
            <Rating name= "half-rating" value={rating} defaultValue={2.5} onChange={(newValue) => setRating(Number(newValue))} precision={0.5}/>
          </Stack>
          <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />}/>

        </CardContent>
      </CardActionArea>
    </CustomCard>
  );
};


{/*

          switch(case) { // => case jest prosta wartoscia, np string, number
            //case jest argumentem funkcji switch
            case: 'Apple': return 'jablko'
            case: 'Banana': {
              console.log(case)
              break;
            }
            }
            switch('Apple')
            // co sie tu dzieje?
            - funkcja switch przyjmuje argument 'Apple'
            - odpala sie cala ta funkcja
            - sprawdza czy ktorykolwiek ze zdefiniowanych wewnatrz niej case'ow
            pasuje do Apple (robi to od gory do dolu)
            - jesli tak to wchodzi w ten case i wykonuje to co jest po :
            * jesli nie dasz returna to przejdzie dalej, mozna tez to powstrzymac dajac slowo
            kluczowe 'break'
            * switch zawsze jest czescia jakiejs naszej wlasnej funkcji
            const mySwitchFunction = (case) => {
              switch(case).....
            }
          }

          ----------------------------------------------------------------------------------
          Odnoszac to do tego zadania domowego:
          - w returnie ze switcha mozesz zwrocic cokolwiek, string, object etc (nawet calego svg)
          - argumentem takiego switcha moze byc typ string lub zamknieta lista stringow*
          * czym jest zamknieta lista stringow?

          const mySwitchFunction = (case: 'GreenIcon' | 'RedIcon') => {
            switch(case) {
                // co nam daje okreslenie tego case jako zamknieta liste stringow?
                - jak sie pomylisz i zrobisz case odnoszacy sie do czegos co nie istnieje
                to kompilator rzuci Ci blad
                - wywolujac ta funkcje nie mozesz podac argumentu, ktory nie pasuje do zadnego case'a
            }
          }
          */}

          <Stack spacing={1} alignContent={"center"} justifyContent={"center"}>
            <Rating
              name="half-rating"
              value={rating}
              defaultValue={2.5}
              onChange={(newValue) => setRating(Number(newValue))}
              precision={0.5}
            />
          </Stack>
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
        </CardContent>
      </CardActionArea>
    </CustomCard>
  );
};
        
