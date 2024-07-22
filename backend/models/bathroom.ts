import { Schema, model } from "mongoose";

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
