import SpaIcon from "@mui/icons-material/Spa";
import { TerpenEnum } from "../types/Terpen";
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)({
  background: "white",
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const switchTerpenIcon = (terpenType: TerpenEnum) => {
  switch (terpenType) {
    case TerpenEnum.LIMONEN:
      return (
        <StyledBox>
          <SpaIcon sx={{ color: "yellow" }} />
          {`${TerpenEnum.LIMONEN.charAt(
            0
          ).toUpperCase()}${TerpenEnum.LIMONEN.slice(1)}`}
        </StyledBox>
      );

    case TerpenEnum.CARIOPHILEN:
      return (
        <StyledBox>
          <SpaIcon sx={{ color: "green" }} />
          {`${TerpenEnum.CARIOPHILEN.charAt(
            0
          ).toUpperCase()}${TerpenEnum.CARIOPHILEN.slice(1)}`}
        </StyledBox>
      );

    case TerpenEnum.MIRCEN:
      return (
        <StyledBox>
          <SpaIcon sx={{ color: "purple" }} />
          {`${TerpenEnum.MIRCEN.charAt(
            0
          ).toUpperCase()}${TerpenEnum.MIRCEN.slice(1)}`}
        </StyledBox>
      );
  }
};
