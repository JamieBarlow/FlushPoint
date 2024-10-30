import { Request, Response, NextFunction } from "express";
import Joi, { CustomHelpers } from "joi";
import AppError from "./AppError";

const validateBathroom = (req: Request, res: Response, next: NextFunction) => {
  // Custom Joi sanitization of empty ("") or "unknown" value strings
  const transformEmptyStringToUndefined = (
    value: string,
    helpers: CustomHelpers
  ) => {
    return value === "" || value === "unknown" ? undefined : value;
  };

  const sanitizeArrayContainingUnknown = (
    arr: string[],
    helpers: CustomHelpers
  ) => {
    const sanitizedArr =
      arr.length > 1 ? arr.filter((item) => item !== "unknown") : arr;
    return sanitizedArr.includes("unknown") || arr.length === 0
      ? undefined
      : arr.join(";");
  };

  const bathroomSchema = Joi.object({
    type: Joi.string().valid("node").required(),
    bathroom_id: Joi.string()
      .guid({ version: ["uuidv4"] })
      .required(),
    lat: Joi.number().precision(6).required(),
    long: Joi.number().precision(6).required(),
    tags: Joi.object({
      amenity: Joi.string().valid("toilets").required(),
      source: Joi.string().valid("local_knowledge"),
      name: Joi.string().required(),
      "addr:street": Joi.string().required(),
      description: Joi.string().min(10).required(),
      operator: Joi.string().optional().custom(transformEmptyStringToUndefined),
      opening_hours: Joi.string()
        .allow("", null)
        .optional()
        .default(
          "Mo 10:00-16:00; Tu-Fr 10:00-20:00; We 11:00-18:00; Sa 11:30-15:30; PH off"
        )
        .custom(transformEmptyStringToUndefined),
      access: Joi.string().optional().custom(transformEmptyStringToUndefined),
      fee: Joi.string().optional().custom(transformEmptyStringToUndefined),
      gender_segregated: Joi.string()
        .optional()
        .custom(transformEmptyStringToUndefined),
      unisex: Joi.string()
        .valid("yes")
        .when(Joi.ref("gender_segregated"), {
          is: "no",
          then: Joi.valid("yes"),
          otherwise: Joi.forbidden(),
        }),
      female: Joi.string().optional().custom(transformEmptyStringToUndefined),
      male: Joi.string().optional().custom(transformEmptyStringToUndefined),
      wheelchair: Joi.string()
        .optional()
        .custom(transformEmptyStringToUndefined),
      "ramp:wheelchair": Joi.string()
        .optional()
        .custom(transformEmptyStringToUndefined),
      "toilets:wheelchair": Joi.string()
        .optional()
        .custom(transformEmptyStringToUndefined),
      "wheelchair:description": Joi.string()
        .optional()
        .custom(transformEmptyStringToUndefined),
      locked: Joi.string().optional().custom(transformEmptyStringToUndefined),
      child: Joi.string().optional().custom(transformEmptyStringToUndefined),
      changing_table: Joi.string()
        .optional()
        .custom(transformEmptyStringToUndefined),
      "changing_table:location": Joi.array()
        .items(Joi.string())
        .custom(sanitizeArrayContainingUnknown)
        .optional()
        .single(), // Allows a single string to be treated as an array with one item
      drinking_water: Joi.string()
        .optional()
        .custom(transformEmptyStringToUndefined),
      "toilets:position": Joi.array()
        .items(Joi.string())
        .custom(sanitizeArrayContainingUnknown)
        .single() // Allows a single string to be treated as an array with one item
        .optional(),
      "toilets:menstrual_products": Joi.string()
        .optional()
        .custom(transformEmptyStringToUndefined),
      vending: Joi.string().optional().custom(transformEmptyStringToUndefined),
      supervised: Joi.string()
        .optional()
        .custom(transformEmptyStringToUndefined),
      indoor: Joi.string().optional().custom(transformEmptyStringToUndefined),
      level: Joi.number().min(-10).max(10),
      shower: Joi.string().optional().custom(transformEmptyStringToUndefined),
      check_date: Joi.date().iso(),
      fixme: Joi.string().optional().custom(transformEmptyStringToUndefined),
    }),
  });

  const { error } = bathroomSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    next(new AppError("Failed to validate bathroom data:" + msg, 400));
  } else {
    next();
  }
};

export default validateBathroom;
