import { Request, Response, NextFunction } from "express";
import Joi, { CustomHelpers } from "joi";
import AppError from "./AppError";

const validateBathroom = (req: Request, res: Response, next: NextFunction) => {
  console.log("Validating bathroom data...");
  const noValue = ["", "unknown"];
  const toiletPositions = ["seated", "urinal", "squat"];
  // Custom Joi sanitization of empty ("") or "unknown" value strings
  const transformEmptyStringToUndefined = (
    value: any,
    helpers: CustomHelpers
  ) => {
    if (
      value === "" ||
      value === "unknown" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return undefined;
    }
    return value;
  };

  // Ensures that returned value is always a string or undefined, never an array
  const sanitizeArray = (arr: string[], helpers: CustomHelpers) => {
    if (!Array.isArray(arr) || arr.length === 0) return undefined;
    const cleaned = arr.filter((item) => item !== "unknown" && item !== "");
    if (cleaned.length === 0) return undefined;
    return cleaned.join(";");
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
      name: Joi.string().required().max(50),
      "addr:street": Joi.string().required().max(50),
      description: Joi.string()
        .allow(...noValue)
        .optional()
        .max(200)
        .custom(transformEmptyStringToUndefined),
      operator: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      opening_hours: Joi.string()
        .allow(...noValue)
        .optional()
        .default(
          "Mo 10:00-16:00; Tu-Fr 10:00-20:00; We 11:00-18:00; Sa 11:30-15:30; PH off"
        )
        .custom(transformEmptyStringToUndefined),
      access: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      fee: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      gender_segregated: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      unisex: Joi.string()
        .allow(...noValue)
        // .valid("yes")
        .when(Joi.ref("gender_segregated"), {
          is: "no",
          then: Joi.valid("yes"),
          otherwise: Joi.forbidden(),
        }),
      female: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      male: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      wheelchair: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      "ramp:wheelchair": Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      "toilets:wheelchair": Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      "wheelchair:description": Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      locked: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      child: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      changing_table: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      "changing_table:location": Joi.array()
        .items(Joi.string())
        .allow(...noValue)
        .optional()
        .single() // Allows a single string to be treated as an array with one item
        .custom(sanitizeArray),
      drinking_water: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      "toilets:position": Joi.array()
        .items(Joi.string().valid(...toiletPositions, ...noValue))
        .custom(sanitizeArray)
        .optional(),
      "toilets:menstrual_products": Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      vending: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      supervised: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      indoor: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      level: Joi.number().allow("").min(-10).max(10),
      shower: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
      check_date: Joi.date().iso(),
      fixme: Joi.string()
        .allow(...noValue)
        .optional()
        .custom(transformEmptyStringToUndefined),
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
