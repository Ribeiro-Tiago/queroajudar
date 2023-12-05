import { GenericObject } from ".";

export type FormErrors = GenericObject<string>;

export interface SelectOption {
  label: string;
  value: string;
}
