const streets = [
  "Abingdon Road",
  "Aristotle Lane",
  "Banbury Road",
  "Bear Lane",
  "Binsey Lane",
  "Botley Road",
  "Cornmarket Street",
  "Divinity Road",
  "George Street",
  "Iffley Road",
  "Little Clarendon Street",
  "Magdalen Street",
  "Marston Road",
  "Oxpens Road",
  "Park End Street",
  "Southmoor Road",
  "Turl Street",
  "Worcester Street",
];

// use for options where yes/no is available but not required
const boolNotRequired = ["yes", "no", undefined];

const fees = ["yes", "no", "unknown"];
const unisex = ["yes", undefined];
const disused = ["toilets", undefined];
const wheelchair = ["yes", "no", "limited", "designated", undefined];
const ramp = ["yes", undefined];
const operator = ["Oxford City Council", "Oxford University"];
const changing_table = ["yes", "no", "limited", undefined];
const changing_table_location = [
  "wheelchair_toilet",
  "female_toilet",
  "male_toilet",
  "unisex_toilet",
  "dedicated_room",
  "room",
];
const menstrual_products = ["yes", "no", "limited", undefined];
const vending = ["feminine_hygiene", undefined];
const supervised = ["yes", "no", "interval", undefined];
const access = ["yes", "customers", undefined];

const seedHelpers = {
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
};

export default seedHelpers;
