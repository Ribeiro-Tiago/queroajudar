import { GenericObject } from ".";

export type FormErrors = GenericObject<string>;

export interface SelectOption {
  label: string;
  value: string;
}

export type HumanDay =
  | "Segunda-feira"
  | "Terça-feira"
  | "Quarta-feira"
  | "Quinta-feira"
  | "Sexta-feira"
  | "Sábado"
  | "Domingo";
