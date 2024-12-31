import { GeneticsEnum } from "../types/GeneticsEnum";
import { TerpenEnum } from "../types/Terpen";

export const mapTerpenEnumToOptions = () => {
  return Object.keys(TerpenEnum).map((terpen) => ({
    label: terpen.toUpperCase(),
    value: terpen.toLowerCase(),
  }));
};

export const mapGeneticsEnumToOptions = () => {
  return Object.keys(GeneticsEnum).map((genetic) => ({
    label: genetic.toUpperCase(),
    value: genetic.toLowerCase(),
  }));
};
