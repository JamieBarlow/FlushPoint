import { Request, Response } from "express";
import AppError from "../middleware/AppError";
import Bathroom from "../models/bathroomModel";

const showBathroomsIndex = async (req: Request, res: Response) => {
  const bathrooms = await Bathroom.find({});
  res.json(bathrooms);
};

const showBathroom = async (req: Request, res: Response) => {
  const bathroom = await Bathroom.findById(req.params.id);
  res.json(bathroom);
};

interface genderOptions {
  isSegregated: string;
  maleOnly: string;
  femaleOnly: string;
}

const createBathroom = async (req: Request, res: Response) => {
  const data = req.body;
  // Handling gender options
  const genderMapping: Record<string, genderOptions> = {
    "Don't Know": { isSegregated: "", maleOnly: "", femaleOnly: "" },
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
  const { isSegregated, maleOnly, femaleOnly } = genderMapping[data.gender] || {
    isSegregated: "",
    maleOnly: "",
    femaleOnly: "",
  };

  // Handling menstrual product options
  let menstrual_products, vending;
  if (data["toilets:menstrual_products"]) {
    const selection = data["toilets:menstrual_products"];
    const location = data.menstrualProducts_location;
    if (selection !== "yes") {
      menstrual_products = selection;
      vending = undefined;
    } else {
      if (location === "limited") {
        menstrual_products = "limited";
        vending = undefined;
      } else if (location === "vending") {
        menstrual_products = "yes";
        vending = "feminine_hygiene";
      } else {
        menstrual_products = "yes";
        vending = undefined;
      }
    }
  }

  // Fetches today's date in ISO format
  const getDate = () => {
    const now = new Date().toISOString().split("T")[0];
    return now;
  };

  const bathroom = new Bathroom({
    type: "node",
    bathroom_id: 1,
    lat: 51.5173639,
    long: -0.140043,
    tags: {
      amenity: "toilets",
      name: data.name,
      "addr:street": data.address,
      description: data.description,
      operator: data.operator,
      opening_hours:
        data.openingHours ||
        "Mo 10:00-16:00; Tu-Fr 10:00-20:00; We 11:00-18:00; Sa 11:30-15:30; PH off",
      female: femaleOnly !== "" ? femaleOnly : undefined,
      male: maleOnly !== "" ? maleOnly : undefined,
      gender_segregated: isSegregated !== "" ? isSegregated : undefined,
      unisex: isSegregated === "no" ? "yes" : undefined,
      wheelchair:
        data.wheelchairBuildingAccess !== "unknown"
          ? data.wheelchairBuildingAccess
          : undefined,
      "ramp:wheelchair":
        data.wheelchairBuildingAccess === "yes" ? "yes" : undefined,
      "toilets:wheelchair":
        data.wheelchairToiletAccess !== "unknown"
          ? data.wheelchairToiletAccess
          : undefined,
      "wheelchair:description": data.wheelchairDescription,
      access: data.access !== "unknown" ? data.access : undefined,
      locked: data.locked !== "unknown" ? data.locked : undefined,
      fee: data.fee !== "unknown" ? data.fee : undefined,
      child: data.child !== "unknown" ? data.child : undefined,
      check_date: getDate(),
      source: "local_knowledge",
      changing_table:
        data.changing_table !== "unknown" ? data.changing_table : undefined,
      "changing_table:location":
        data["changing_table:location"][0] !== "unknown"
          ? data["changing_table:location"].join(";")
          : undefined,
      drinking_water:
        data.drinking_water !== "unknown" ? data.drinking_water : undefined,
      "toilets:position": "seated;urinal",
      "toilets:menstrual_products":
        menstrual_products !== "unknown" ? menstrual_products : undefined,
      vending: vending !== "unknown" ? vending : undefined,
      supervised: data.supervised !== "unknown" ? data.supervised : undefined,
      indoor: data.indoor !== "unknown" ? data.indoor : undefined,
      level: data.level,
      shower: data.shower !== "unknown" ? data.shower : undefined,
      fixme: data.fixme ? data.fixme : undefined,
    },
  });
  await bathroom.save();

  if (bathroom) {
    // res.status(201).json(bathroom);
    res.redirect(`/bathrooms/${bathroom._id}`);
  } else {
    res.status(400);
    throw new AppError("bathroom could not be created", 400);
  }
};

const bathroomController = {
  showBathroomsIndex,
  showBathroom,
  createBathroom,
};

export default bathroomController;
