import Bathroom from "../models/bathroomModel";
import AppError from "../middleware/AppError";
import { Request, Response } from "express";
import seedHelpers from "./seedHelpers";

const {
  streets,
  boolNotRequired,
  fees,
  unisex,
  disused,
  wheelchair,
  ramp,
  operator,
  changing_table,
  changing_table_location,
  menstrual_products,
  vending,
  supervised,
  access,
} = seedHelpers;

function getRand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function yesNoNull() {
  return boolNotRequired[getRand(0, 2)];
}
function getIsoDate() {
  function formattedNum(num: number) {
    return num < 10 ? "0" + num : num;
  }
  const years = ["2022", "2023", "2024"];
  const month = formattedNum(getRand(0, 11));
  const day = formattedNum(getRand(0, 27));
  const date = `${years[getRand(0, 2)]}-${month}-${day}`;
  return date;
}

const seedDB = async (req: Request, res: Response) => {
  await Bathroom.deleteMany({});
  let i = 1;
  const street = streets[getRand(0, 17)];
  const wheelchairAccess = wheelchair[getRand(0, 4)];
  const rampAccess = wheelchairAccess === "yes" ? "yes" : null;

  const bathroom = new Bathroom({
    type: "node",
    bathroom_id: i,
    lat: getRand(-90, 90),
    long: getRand(-90, 90),
    tags: {
      amenity: "toilets",
      "addr:street": street,
      fee: "no",
      female: yesNoNull(),
      male: yesNoNull(),
      unisex: unisex[getRand(0, 1)],
      gender_segregated: yesNoNull(),
      child: yesNoNull(),
      check_date: getIsoDate(),
      name: `${street} public toilets`,
      opening_hours:
        "Mo 10:00-16:00; Tu 10:00-20:00; We 11:00-18:00; Th 11:30-15:30; Fr 09:00-12:00; PH off",
      source: "local_knowledge",
      wheelchair: wheelchairAccess,
      "ramp:wheelchair": rampAccess,
      "toilets:wheelchair": yesNoNull(),
      operator: operator[getRand(0, 1)],
      changing_table: changing_table[getRand(0, 3)],
      "changing_table:location": changing_table_location[getRand(0, 5)],
      drinking_water: yesNoNull(),
      "toilets:position": "seated",
      "toilets:menstrual_products": menstrual_products[getRand(0, 3)],
      vending: vending[getRand(0, 1)],
      supervised: supervised[getRand(0, 3)],
      access: access[getRand(0, 2)],
      indoor: yesNoNull(),
      level: getRand(-10, 10),
      shower: yesNoNull(),
    },
  });
  await bathroom.save();
  if (bathroom) {
    res.status(201).json(bathroom);
  } else {
    res.status(400);
    throw new AppError("bathroom could not be created", 400);
  }
};

export default seedDB;

// const bathroom = new Bathroom({
//   type: "node",
//   bathroom_id: 1,
//   lat: 51.5173639,
//   long: -0.140043,
//   tags: {
//     amenity: "toilets",
//     "addr:street": "Test street",
//     fee: "no",
//     female: "yes",
//     male: "yes",
//     gender_segregated: "yes",
//     child: "no",
//     check_date: "2024-07-24",
//     name: "Test street public toilets",
//     opening_hours:
//       "Mo 10:00-16:00; Tu-Fr 10:00-20:00; We 11:00-18:00; Sa 11:30-15:30; PH off",
//     description: "testing description",
//     source: "local_knowledge",
//     wheelchair: "limited",
//     "toilets:wheelchair": "yes",
//     "wheelchair:description": "does this meet wheelchair requirements?",
//     operator: "Oxford City Council",
//     changing_table: "yes",
//     "changing_table:location": "dedicated_room",
//     drinking_water: "no",
//     "toilets:position": "seated;urinal",
//     "toilets:menstrual_products": "yes",
//     access: "yes",
//     locked: "no",
//     indoor: "no",
//     level: 0,
//     shower: "no",
//   },
// });
