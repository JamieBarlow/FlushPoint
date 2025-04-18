import { z } from "zod";
import * as Enums from "./enums";

export const bathroomSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(4, { message: "Must be at least 4 characters long" })
    .max(50, { message: "Cannot be over 50 characters long" }),
  "addr:street": z
    .string()
    .nonempty("Address is required")
    .min(4, { message: "Must be at least 4 characters long" })
    .max(50, { message: "Cannot be over 50 characters long" }),
  description: z
    .string()
    .max(200, { message: "Cannot be over 200 characters long" }),
  operator: z
    .string()
    .max(50, { message: "Cannot be over 50 characters long" }),
  access: Enums.AccessEnum.optional(),
  fee: Enums.FeeEnum.optional(),
  locked: Enums.lockedEnum.optional(),
  indoor: Enums.indoorEnum.optional(),
  level: z.number().min(-10).max(10),
  gender_segregated: Enums.gender_segregatedEnum.optional(),
  wheelchair: Enums.wheelchairEnum.optional(),
  "toilets:wheelchair": Enums.toilets_wheelchairEnum.optional(),
  "wheelchair:description": z
    .string()
    .max(100, { message: "Cannot be over 100 characters long" }),
  "toilets:position": Enums.toilets_positionEnum.optional(),
  child: Enums.childEnum.optional(),
  changing_table: Enums.changing_tableEnum.optional(),
  "changing_table:location": Enums.changing_table_locationEnum.optional(),
  drinking_water: Enums.drinking_waterEnum.optional(),
  "toilets:menstrual_products": Enums.toilets_menstrual_productsEnum.optional(),
  vending: Enums.vendingEnum.optional(),
  supervised: Enums.supervisedEnum.optional(),
  shower: Enums.showerEnum.optional(),
  fixme: z.string().max(200, { message: "Cannot be over 200 characters long" }),
});

export type FormFields = z.infer<typeof bathroomSchema>;
