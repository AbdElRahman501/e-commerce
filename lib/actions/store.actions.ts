"use server";
import { CollectionType, NavbarType, ReviewType, StoryType } from "@/types";
import { connectToDatabase } from "../mongoose";
import { Collection, NavBarLink, Review, Story } from "../models/store.model";
import { redirect } from "next/navigation";
import { checkDateStatus } from "@/utils";

export async function fetchStories(): Promise<StoryType[]> {
  try {
    connectToDatabase();
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
export async function fetchNavbarLinks(): Promise<NavbarType[]> {
  try {
    connectToDatabase();
    const data = await NavBarLink.find({});
    const navbarLinks: NavbarType[] = JSON.parse(JSON.stringify(data));
    return navbarLinks;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchAllStories(): Promise<StoryType[]> {
  try {
    connectToDatabase();
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
  try {
    connectToDatabase();
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
    connectToDatabase();
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
    connectToDatabase();
    await Story.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/store");
};

//// REVIEW ACTIONS

export const fetchReviews = async ({ limit = 4 }: { limit?: number }) => {
  try {
    connectToDatabase();
    const data = await Review.find({}).limit(limit);
    const reviews: ReviewType[] = JSON.parse(JSON.stringify(data));
    return reviews;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addNewReview = async (formData: FormData) => {
  const imagesString = formData.get("images")?.toString();
  const images = imagesString ? imagesString.split(",") : [];
  const data = {
    name: formData.get("name")?.toString() || "",
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    rating: Number(formData.get("rating")) || 0,
    images: images,
  };
  try {
    connectToDatabase();
    await Review.create(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/reviews");
};

export const removeReview = async (formData: FormData) => {
  const id = formData.get("id")?.toString() || "";
  if (!id) return;
  try {
    connectToDatabase();
    await Review.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/reviews");
};

export const updateReview = async (formData: FormData) => {
  const imagesString = formData.get("images")?.toString();
  const images = imagesString ? imagesString.split(",") : [];
  const data = {
    id: formData.get("id")?.toString() || "",
    name: formData.get("name")?.toString() || "",
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    rating: Number(formData.get("rating")) || 0,
    images: images,
  };
  try {
    connectToDatabase();
    await Review.findByIdAndUpdate(data.id, data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/reviews");
};

// Collections actions

export const fetchCollections = async () => {
  try {
    connectToDatabase();
    const data = await Collection.find({});
    const collections: CollectionType[] = JSON.parse(JSON.stringify(data));
    return collections;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addNewCollection = async (formData: FormData) => {
  const data = {
    name: formData.get("name")?.toString() || "",
    image: formData.get("image")?.toString() || "",
    url: formData.get("url")?.toString() || "",
  };
  try {
    connectToDatabase();
    await Collection.create(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/store/collections");
};

export const removeCollection = async (formData: FormData) => {
  const id = formData.get("id")?.toString() || "";
  if (!id) return;
  try {
    connectToDatabase();
    await Collection.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/store/collections");
};

export const updateCollection = async (formData: FormData) => {
  const data = {
    id: formData.get("id")?.toString() || "",
    name: formData.get("name")?.toString() || "",
    image: formData.get("image")?.toString() || "",
    url: formData.get("url")?.toString() || "",
  };
  try {
    connectToDatabase();
    await Collection.findByIdAndUpdate(data.id, data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/store/collections");
};
