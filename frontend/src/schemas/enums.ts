import { z } from "zod";

// Enum values for validation
const accessValues = ["yes", "customers", "unknown"] as const;
export const AccessEnum = z.enum(accessValues);
const feeValues = ["yes", "no", "donation", "unknown"] as const;
export const FeeEnum = z.enum(feeValues);
const lockedValues = ["yes", "no", "unknown"] as const;
export const lockedEnum = z.enum(lockedValues);
const indoorValues = ["yes", "no", "unknown"] as const;
export const indoorEnum = z.enum(indoorValues);
const gender_segregatedValues = [
  "Gender segregated",
  "Unisex (gender neutral)",
  "Male only",
  "Female only",
  "Don't know",
] as const;
export const gender_segregatedEnum = z.enum(gender_segregatedValues);
const wheelchairValues = [
  "yes",
  "limited",
  "no",
  "designated",
  "unknown",
] as const;
export const wheelchairEnum = z.enum(wheelchairValues);
const toilets_wheelchairValues = [
  "yes",
  "limited",
  "no",
  "designated",
  "unknown",
] as const;
export const toilets_wheelchairEnum = z.enum(toilets_wheelchairValues);
const toilets_positionValues = [
  "seated",
  "urinal",
  "squat",
  "unknown",
] as const;
export const toilets_positionEnum = z.enum(toilets_positionValues);
const childValues = ["yes", "no", "unknown"] as const;
export const childEnum = z.enum(childValues);
const changing_tableValues = ["yes", "no", "limited", "unknown"] as const;
export const changing_tableEnum = z.enum(changing_tableValues);
const changing_table_locationValues = [
  "wheelchair_toilet",
  "female_toilet",
  "male_toilet",
  "unisex_toilet",
  "dedicated_room",
  "room",
  "unknown",
] as const;
export const changing_table_locationEnum = z.enum(
  changing_table_locationValues
);
const drinking_waterValues = ["yes", "no", "unknown"] as const;
export const drinking_waterEnum = z.enum(drinking_waterValues);
const toilets_menstrual_productsValues = ["yes", "no", "unknown"] as const;
export const toilets_menstrual_productsEnum = z.enum(
  toilets_menstrual_productsValues
);
const vendingValues = ["free", "limited", "vending", "unknown"] as const;
export const vendingEnum = z.enum(vendingValues);
const supervisedValues = ["yes", "no", "interval", "unknown"] as const;
export const supervisedEnum = z.enum(supervisedValues);
const showerValues = ["yes", "no", "unknown"] as const;
export const showerEnum = z.enum(showerValues);
