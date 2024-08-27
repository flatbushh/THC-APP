import { GeneticsEnum } from "../types/GeneticsEnum";
import { TerpenEnum } from "../types/Terpen";

export const geneticsFilters = () => {
  const keys = Object.keys(GeneticsEnum);
  const genetics = keys.map((key) => ({
    label: GeneticsEnum[key as keyof typeof GeneticsEnum], // tu musimy zrobic takiego stringa, zeby tylko pierwsza litera byla duza
    value: GeneticsEnum[key as keyof typeof GeneticsEnum],
  }));
  return genetics;
};

export const terpenFilters = () => {
  const keys = Object.keys(TerpenEnum);
  const terpens = keys.map((key) => ({
    label: TerpenEnum[key as keyof typeof TerpenEnum],
    value: TerpenEnum[key as keyof typeof TerpenEnum],
  }));
  return terpens;
};
