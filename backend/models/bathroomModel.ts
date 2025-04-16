import { Schema, model } from "mongoose";

const iso8601Regex = /^\d{4}-\d{2}-\d{2}$/;

export interface Tags {
  amenity: string;
  building: string;
  "addr:street": string;
  fee: string;
  female: string;
  male: string;
  unisex: string;
  gender_segregated: string;
  child: string;
  check_date: string;
  name: string;
  opening_hours: string;
  "disused:amenity": string;
  description: string;
  source: string;
  wheelchair: string;
  "ramp:wheelchair": string;
  "toilets:wheelchair": string;
  "wheelchair:description": string;
  operator: string;
  changing_table: string;
  "changing_table:location": string;
  drinking_water: string;
  "toilets:position": string;
  "toilets:menstrual_products": string;
  vending: string;
  supervised: string;
  access: string;
  "toilets:access": string;
  locked: string;
  indoor: string;
  level: number;
  shower: string;
  fixme: string;
}

export interface BathroomType {
  _id: string;
  type: string;
  bathroom_id: number;
  lat: number;
  long: number;
  tags: Tags;
}

function semicolonEnumValidator(allowedValues: string[], label = "value") {
  return {
    validator: function (value: string | undefined) {
      if (!value) return true; // allow undefined
      const parts = value.split(";").map((p) => p.trim());
      return parts.every((p) => allowedValues.includes(p));
    },
    message: (props: any) =>
      `"${
        props.value
      }" contains an invalid ${label}. Allowed values: ${allowedValues.join(
        ", "
      )}`,
  };
}

const tagsSchema = new Schema({
  amenity: {
    type: String,
    required: true,
    // "toilets" will apply in most cases initially for dedicated public bathrooms.
    enum: ["toilets", "pub", "bar", "restaurant", "fast_food", "shop"],
    default: "toilets",
  },
  building: {
    type: String,
    // Use "toilets" for a separate toilet block, otherwise "yes" for unspecified
    enum: ["toilets", "yes"],
    default: "yes",
  },
  source: {
    type: String,
    enum: ["local_knowledge"],
    default: "local_knowledge",
  },
  name: {
    type: String,
    // OSM docs: if there is no explicit name - tagging with amenity:toilets is sufficient. However, a name is preferred so this is marked as required
    maxLength: 50,
    required: true,
  },
  "addr:street": {
    type: String,
    maxLength: 50,
    required: true,
  },
  description: {
    type: String,
    maxLength: 200,
    default: undefined,
  },
  operator: {
    type: String,
    maxLength: 50,
    default: undefined,
  },
  opening_hours: {
    type: String,
    // example format: "Mo 10:00-16:00; Tu-Fr 10:00-20:00; We 11:00-18:00; Sa 11:30-15:30; PH off". See https://openingh.ypid.de/evaluation_tool/
  },
  fee: {
    type: String,
    enum: ["yes", "no", "donation", undefined],
  },
  access: {
    type: String,
    // 'yes' = public, with or without fee. 'Customers' = may require purchase or key/code.
    // Don't use this property if toilet is in a different building/amenity - see toilets:access instead.
    enum: ["yes", "customers", undefined],
    default: undefined,
  },
  "toilets:access": {
    type: String,
    // use instead of 'access' only if amenity !== "toilets" (i.e. if in dedicated toilet building)
    enum: ["yes", "customers", undefined],
    default: undefined,
  },
  // Doesn't refer to locking outside operating hours. Use 'yes' if requires key/card during opening hours, e.g. customer access
  locked: {
    type: String,
    enum: ["yes", "no", undefined],
    default: undefined,
  },
  // gender options
  female: {
    type: String,
    enum: ["yes", "no", undefined],
    default: undefined,
  },
  male: {
    type: String,
    enum: ["yes", "no", undefined],
    default: undefined,
  },
  unisex: {
    type: String,
    // note 'yes' means gender-neutral, not gender segregated. Can also combine with gender_segregated: 'no' to be more explicit
    enum: ["yes", undefined],
    default: undefined,
  },
  gender_segregated: {
    type: String,
    enum: ["yes", "no", undefined],
    default: undefined,
  },
  // wheelchair options
  // refers to access to toilet building/facility only - see toilets:wheelchair for disabled access to toilet itself
  wheelchair: {
    type: String,
    enum: ["yes", "no", "limited", "designated", undefined],
    default: undefined,
  },
  // combine w wheelchair property if "yes"
  "ramp:wheelchair": {
    type: String,
    enum: ["yes", undefined],
    default: undefined,
  },
  // Provisions for toilet itself - https://wiki.openstreetmap.org/wiki/Key:toilets:wheelchair
  "toilets:wheelchair": {
    type: String,
    enum: ["yes", "no", "limited", "designated", undefined],
    default: undefined,
  },
  // if unsure of any of above - values should only be explicitly entered if known
  "wheelchair:description": {
    type: String,
    maxLength: 100,
    default: undefined,
  },
  "toilets:position": {
    type: String,
    // options are: "seated" (only), "urinal" (only), "squat" (only). If multiple types exist, separate with semicolon
    validate: semicolonEnumValidator(
      ["seated", "urinal", "squat"],
      "toilet position"
    ),
    default: undefined,
  },
  child: {
    type: String,
    // Seats and urinals specifically for children
    enum: ["yes", "no", undefined],
    default: undefined,
  },
  // Changing table options. 'Limited' means there is a facility available, but not built to be used as a changing table
  changing_table: {
    type: String,
    enum: ["yes", "no", "limited", undefined],
    default: undefined,
  },
  "changing_table:location": {
    type: String,
    // options are: "wheelchair_toilet", "female_toilet", "male_toilet", "unisex_toilet", "dedicated_room", "room". If multiple, can be separated by semicolon
    validate: semicolonEnumValidator(
      [
        "wheelchair_toilet",
        "female_toilet",
        "male_toilet",
        "unisex_toilet",
        "dedicated_room",
        "room",
      ],
      "changing table location"
    ),
    default: undefined,
  },
  drinking_water: {
    type: String,
    enum: ["yes", "no", undefined],
    default: undefined,
  },
  "toilets:menstrual_products": {
    // "yes" = available for all toilet users (for free). "no" = non available. "limited" means e.g. only available in female-only stalls.
    // If not freely available but can be bought, use vending=feminine_hygiene
    type: String,
    enum: ["yes", "no", "limited", undefined],
    default: undefined,
  },
  // Apply if menstrual products are available from vending machine but not free
  vending: {
    type: String,
    enum: ["feminine_hygiene", undefined],
    default: undefined,
  },
  supervised: {
    type: String,
    enum: ["yes", "no", "interval", undefined],
    default: undefined,
  },
  // refers to entrance
  indoor: {
    type: String,
    enum: ["yes", "no", undefined],
    default: undefined,
  },
  // Zero-based floor number of a feature (where 0 is the ground level and -1 is the basement)
  level: {
    type: Number,
    min: -10,
    max: 10,
  },
  shower: {
    type: String,
    enum: ["yes", "no", undefined],
    default: undefined,
  },
  "disused:amenity": {
    type: String,
    enum: ["toilets", undefined],
    default: undefined,
  },
  // A flag to other mappers that something may need changing / checking
  fixme: {
    type: String,
    maxLength: 200,
    default: undefined,
  },
  check_date: {
    type: String,
    required: true,
    match: [iso8601Regex, "Please enter a valid date in the format YYYY-MM-DD"],
  },
});

const bathroomSchema = new Schema<BathroomType>({
  type: {
    type: String,
    required: true,
    enum: ["node"],
    default: "node",
  },
  bathroom_id: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    min: -90,
    max: 90,
    required: true,
  },
  long: {
    type: Number,
    min: -90,
    max: 90,
    required: true,
  },
  tags: {
    type: tagsSchema,
    required: true,
  },
});

const Bathroom = model("Bathroom", bathroomSchema);
export default Bathroom;
