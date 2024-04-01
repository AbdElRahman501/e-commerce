import { StoryType } from "@/types";
import { connectToDatabase } from "../mongoose";
import { Story } from "../models/store.model";

export async function fetchStories(): Promise<StoryType[]> {
  try {
    await connectToDatabase();
    const data = await Story.find({});
    const stories: StoryType[] = JSON.parse(JSON.stringify(data));
    return stories;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
