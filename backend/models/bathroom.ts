import { Schema, model } from "mongoose";

const iso8601Regex = /^\d{4}-\d{2}-\d{2}$/;

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
  "addr:street": {
    type: String,
    maxLength: 50,
  },
  fee: {
    type: String,
    required: true,
    enum: ["yes", "no", "unknown"],
  },
  female: {
    type: String,
    enum: ["yes", "no", null],
    default: null,
  },
  male: {
    type: String,
    enum: ["yes", "no", null],
    default: null,
  },
  unisex: {
    type: String,
    // note 'yes' means gender-neutral, not gender segregated. Can also combine with gender_segregated: 'no' to be more explicit
    enum: ["yes", null],
    default: null,
  },
  gender_segregated: {
    type: String,
    enum: ["yes", "no", null],
    default: null,
  },
  child: {
    type: String,
    // Seats and urinals specifically for children
    enum: ["yes", "no", null],
    default: null,
  },
  check_date: {
    type: String,
    required: true,
    match: [iso8601Regex, "Please enter a valid date in the format YYYY-MM-DD"],
  },
  name: {
    type: String,
    // do not use if there is no explicit name - tagging with amenity:toilets is sufficient
    maxLength: 50,
  },
  opening_hours: {
    type: String,
    // example format: "Mo 10:00-16:00; Tu-Fr 10:00-20:00; We 11:00-18:00; Sa 11:30-15:30; PH off". See https://openingh.ypid.de/evaluation_tool/
  },
  "disused:amenity": {
    type: String,
    enum: ["toilets", null],
    default: null,
  },
  description: {
    type: String,
    maxLength: 200,
  },
  source: {
    type: String,
    enum: ["local_knowledge"],
    default: "local_knowledge",
  },
  // refers to access to toilet building/facility only - see toilets:wheelchair for disabled access to toilet itself
  wheelchair: {
    type: String,
    enum: ["yes", "no", "limited", "designated", null],
  },
  // combine w wheelchair property if "yes"
  "ramp:wheelchair": {
    type: String,
    enum: ["yes", null],
    default: null,
  },
  // Provisions for toilet itself - https://wiki.openstreetmap.org/wiki/Key:toilets:wheelchair
  "toilets:wheelchair": {
    type: String,
    enum: ["yes", "no", null],
    default: null,
  },
  // if unsure of any of above - values should only be explicitly entered if known
  "wheelchair:description": {
    type: String,
    maxLength: 100,
  },
  operator: {
    type: String,
    maxLength: 50,
  },
  changing_table: {
    type: String,
    enum: ["yes", "no", "limited", null],
    default: null,
  },
  "changing_table:location": {
    type: String,
    // options are: "wheelchair_toilet", "female_toilet", "male_toilet", "unisex_toilet", "dedicated_room", "room". If multiple, can be separated by semicolon
  },
  drinking_water: {
    type: String,
    enum: ["yes", "no", null],
    default: null,
  },
  "toilets:position": {
    type: String,
    // options are: "seated" (only), "urinal" (only), "squat" (only). If multiple types exist, separate with semicolon
  },
  "toilets:menstrual_products": {
    // "yes" = available for all toilet users (for free). "no" = non available. "limited" means e.g. only available in female-only stalls.
    // If not freely available but can be bought, use vending=feminine_hygiene
    type: String,
    enum: ["yes", "no", "limited", null],
    default: null,
  },
  vending: {
    type: String,
    enum: ["feminine_hygiene", null],
    default: null,
  },
  supervised: {
    type: String,
    enum: ["yes", "no", "interval", null],
    default: null,
  },
  access: {
    type: String,
    // 'yes' = public, with or without fee. 'Customers' = may require purchase or key/code.
    // Don't use this property if toilet is in a different building/amenity - see toilets:access instead.
    enum: ["yes", "customers", null],
    default: null,
  },
  "toilets:access": {
    type: String,
    // use instead of 'access' only if amenity != "toilets" (i.e. not dedicated toilet building)
    enum: ["yes", "customers", null],
    default: null,
  },
  locked: {
    type: String,
    enum: ["yes", "no", null],
    default: null,
  },
  // refers to entrance
  indoor: {
    type: String,
    enum: ["yes", "no", null],
    default: null,
  },
  // Zero-based floor number of a feature (where 0 is the ground level and -1 is the basement)
  level: {
    type: Number,
    min: -10,
    max: 10,
  },
  shower: {
    type: String,
    enum: ["yes", "no", null],
    default: null,
  },
  // A flag to other mappers that something may need changing / checking
  fixme: {
    type: String,
    maxLength: 200,
  },
});

const bathroomSchema = new Schema({
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
    type: String,
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  tags: {
    type: tagsSchema,
    required: true,
  },
});

const Bathroom = model("Bathroom", bathroomSchema);
export default Bathroom;
