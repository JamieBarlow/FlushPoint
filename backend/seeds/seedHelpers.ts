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
const boolNotRequired = ["yes", "no", null];

const fees = ["yes", "no", "unknown"];
const unisex = ["yes", null];
const disused = ["toilets", null];
const wheelchair = ["yes", "no", "limited", "designated", null];
const ramp = ["yes", null];
const operator = ["Oxford City Council", "Oxford University"];
const changing_table = ["yes", "no", "limited", null];
const changing_table_location = [
  "wheelchair_toilet",
  "female_toilet",
  "male_toilet",
  "unisex_toilet",
  "dedicated_room",
  "room",
];
const menstrual_products = ["yes", "no", "limited", null];
const vending = ["feminine_hygiene", null];
const supervised = ["yes", "no", "interval", null];
const access = ["yes", "customers", null];

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
