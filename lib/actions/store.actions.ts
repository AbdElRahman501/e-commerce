"use server";
import { StoryType } from "@/types";
import { connectToDatabase } from "../mongoose";
import { Story } from "../models/store.model";
import { redirect } from "next/navigation";
import { checkDateStatus } from "@/utils";

export async function fetchStories(): Promise<StoryType[]> {
  try {
    await connectToDatabase();
    const currentDate = new Date();

    const data = await Story.find({});
    const stories: StoryType[] = JSON.parse(JSON.stringify(data));
    const filteredStories: StoryType[] = stories.filter(
      (story) => checkDateStatus(story.start, story.end).name === "active",
    );
    return filteredStories;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchAllStories(): Promise<StoryType[]> {
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

export const updateStory = async (formData: FormData) => {
  const data = {
    id: formData.get("id")?.toString() || "",
    image: formData.get("image")?.toString() || "",
    start: formData.get("start")?.toString() || "",
    end: formData.get("end")?.toString() || "",
    url: formData.get("url")?.toString() || "",
  };
  console.log("🚀 ~ updateStory ~ data:", data);
  try {
    await connectToDatabase();
    await Story.findByIdAndUpdate(data.id, data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/store");
};

export const addNewStory = async (formData: FormData) => {
  const data = {
    image: formData.get("image")?.toString() || "",
    start: formData.get("start")?.toString() || "",
    end: formData.get("end")?.toString() || "",
    url: formData.get("url")?.toString() || "",
  };
  if (!data.image) return;
  try {
    await connectToDatabase();
    await Story.create(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/store");
};
export const removeStory = async (formData: FormData) => {
  const id = formData.get("id")?.toString() || "";
  if (!id) return;
  try {
    await connectToDatabase();
    await Story.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/store");
};
