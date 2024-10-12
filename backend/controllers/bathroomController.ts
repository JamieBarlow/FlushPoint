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

export const createBathroomAction: ActionFunction = async ({ request }) => {
  // gather data from form
  const data = await request.formData();
  const submission = {
    name: data.get("name"),
    address: data.get("address"),
    description: data.get("description"),
    operator: data.get("operator"),
    openingHours: data.get("openingHours"),
  };
  console.log(submission);
  // validation
  if (
    typeof submission.description === "string" &&
    submission.description.length < 10
  ) {
    return { error: "Description must be over 10 chars long" };
  }
  // Send POST request to API
  try {
    const response = await fetch("http://localhost:8000/bathrooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission),
    });
    if (!response.ok) {
      throw new Error("Network response failed");
    }
    const result = await response.json();
    console.log("Success:", result);
    return redirect("/bathrooms");
  } catch (error) {
    console.error("Error submitting form:", error);
    return { error: "Failed to create bathroom" };
  }
};

const createBathroom = async (req: Request, res: Response) => {
  // const {} = req.body;

  const bathroom = new Bathroom({
    type: "node",
    bathroom_id: 1,
    lat: 51.5173639,
    long: -0.140043,
    tags: {
      amenity: "toilets",
      "addr:street": "Test street",
      fee: "no",
      female: "yes",
      male: "yes",
      gender_segregated: "yes",
      child: "no",
      check_date: "2024-07-24",
      name: "Test street public toilets",
      opening_hours:
        "Mo 10:00-16:00; Tu-Fr 10:00-20:00; We 11:00-18:00; Sa 11:30-15:30; PH off",
      description: "testing description",
      source: "local_knowledge",
      wheelchair: "limited",
      "toilets:wheelchair": "yes",
      "wheelchair:description": "does this meet wheelchair requirements?",
      operator: "Oxford City Council",
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
