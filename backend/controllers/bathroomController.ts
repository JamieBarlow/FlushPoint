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
  const { tags } = data;

  const bathroom = new Bathroom({
    type: data.type,
    bathroom_id: data.bathroom_id,
    lat: data.lat,
    long: data.long,
    tags: {
      amenity: tags.amenity,
      source: tags.source,
      name: tags.name,
      "addr:street": tags["addr:street"],
      description: tags.description,
      operator: tags.operator,
      opening_hours:
        tags.opening_hours ||
        "Mo 10:00-16:00; Tu-Fr 10:00-20:00; We 11:00-18:00; Sa 11:30-15:30; PH off",
      access: tags.access,
      fee: tags.fee,
      gender_segregated: tags.gender_segregated,
      unisex: tags.unisex,
      female: tags.female,
      male: tags.male,
      wheelchair: tags.wheelchair,
      "ramp:wheelchair": tags["ramp:wheelchair"],
      "toilets:wheelchair": tags["toilets:wheelchair"],
      "wheelchair:description": tags["wheelchair:description"],
      locked: tags.locked,
      child: tags.child,
      changing_table: tags.changing_table,
      "changing_table:location": tags["changing_table:location"],
      drinking_water: tags.drinking_water,
      "toilets:position": tags["toilets:position"],
      "toilets:menstrual_products": tags["toilets:menstrual_products"],
      vending: tags.vending,
      supervised: tags.supervised,
      indoor: tags.indoor,
      level: tags.level,
      shower: tags.shower,
      check_date: tags.check_date,
      fixme: tags.fixme,
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
