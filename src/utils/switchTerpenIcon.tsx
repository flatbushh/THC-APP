import SpaIcon from "@mui/icons-material/Spa";
import { TerpenEnum } from "../types/Terpen";
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)({
  background: "red",
});

export const switchTerpenIcon = (terpenType: TerpenEnum) => {
  // eslint-disable-next-line default-case
  switch (terpenType) {
    case TerpenEnum.LIMONEN:
      return (
        <StyledBox>
          <SpaIcon sx={{ color: "yellow" }} /> {TerpenEnum.LIMONEN}
        </StyledBox>
      );

    case TerpenEnum.CARIOPHILEN:
      return <SpaIcon sx={{ color: "green" }} />;

    case TerpenEnum.MIRCEN:
      return <SpaIcon sx={{ color: "purple" }} />;
  }
};
