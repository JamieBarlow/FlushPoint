import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";

interface genderOptions {
  isSegregated?: string;
  maleOnly?: string;
  femaleOnly?: string;
}

const sanitizeBathroom = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    // Handling gender options
    const genderMapping: Record<string, genderOptions> = {
      "Don't Know": {
        isSegregated: undefined,
        maleOnly: undefined,
        femaleOnly: undefined,
      },
      "Gender segregated": {
        isSegregated: "yes",
        maleOnly: "no",
        femaleOnly: "no",
      },
      "Unisex (gender neutral)": {
        isSegregated: "no",
        maleOnly: "no",
        femaleOnly: "no",
      },
      "Male only": { isSegregated: "yes", maleOnly: "yes", femaleOnly: "no" },
      "Female only": { isSegregated: "yes", maleOnly: "no", femaleOnly: "yes" },
    };
    const { isSegregated, maleOnly, femaleOnly } = genderMapping[
      data.tags.gender_segregated
    ] || {
      isSegregated: undefined,
      maleOnly: undefined,
      femaleOnly: undefined,
    };
    data.tags.gender_segregated = isSegregated;
    data.tags.male = maleOnly;
    data.tags.female = femaleOnly;

    // Handling unisex data (dependent on status of isSegregated)
    data.tags.unisex = isSegregated === "no" ? "yes" : undefined;

    // Handling menstrual product options
    if (data.tags["toilets:menstrual_products"]) {
      const selection = data.tags["toilets:menstrual_products"];
      const location = data.tags.vending;
      if (selection !== "yes") {
        data.tags["toilets:menstrual_products"] = selection;
        data.tags.vending = undefined;
      } else {
        switch (location) {
          case "limited":
            data.tags["toilets:menstrual_products"] = "limited";
            data.tags.vending = undefined;
            break;
          case "vending":
            data.tags["toilets:menstrual_products"] = "yes";
            data.tags.vending = "feminine_hygiene";
            break;
          default:
            data.tags["toilets:menstrual_products"] = "yes";
            data.tags.vending = undefined;
        }
      }
    }

    // Handling wheelchair options
    data.tags.wheelchair === "yes"
      ? (data.tags["ramp:wheelchair"] = "yes")
      : (data.tags["ramp:wheelchair"] = undefined);

    req.body = data;
    next();
  } catch (error) {
    console.error("Error during sanitization:", error);
    next(new AppError("Failed to sanitize bathroom data", 400));
  }
};

export default sanitizeBathroom;
