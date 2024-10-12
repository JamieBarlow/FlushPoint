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

const createBathroom = async (req: Request, res: Response) => {
  const data = req.body;
  // Handling gender options
  const genderMapping = {
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

  const { isSegregated, maleOnly, femaleOnly } =
    genderMapping[data.gender] || {};

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
      female: femaleOnly,
      male: maleOnly,
      gender_segregated: isSegregated,
      unisex: isSegregated === "no" ? "yes" : "",
      fee: "no",
      child: "no",
      check_date: "2024-07-24",
      source: "local_knowledge",
      wheelchair: "limited",
      "toilets:wheelchair": "yes",
      "wheelchair:description": "does this meet wheelchair requirements?",
      changing_table: "yes",
      "changing_table:location": "dedicated_room",
      drinking_water: "no",
      "toilets:position": "seated;urinal",
      "toilets:menstrual_products": "yes",
      access: "yes",
      locked: "no",
      indoor: "no",
      level: 0,
      shower: "no",
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
