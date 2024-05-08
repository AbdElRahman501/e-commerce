"use server";
import {
  CollectionType,
  FooterType,
  NavbarType,
  ReviewType,
  StoryType,
} from "@/types";
import { connectToDatabase } from "../mongoose";
import {
  Collection,
  FooterLink,
  NavBarLink,
  Review,
  Story,
} from "../models/store.model";
import { redirect } from "next/navigation";
import { checkDateStatus } from "@/utils";
import { unstable_cache } from "next/cache";

export const fetchStories = unstable_cache(
  async (): Promise<StoryType[]> => {
    try {
      await connectToDatabase();
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
  },
  ["stories"],
  {
    tags: ["stories"],
    revalidate: 60 * 60 * 24,
  },
);

export const fetchFooterLinks = unstable_cache(
  async (): Promise<FooterType[]> => {
    try {
      await connectToDatabase();
      const data = await FooterLink.find({});
      const footerLinks: FooterType[] = JSON.parse(JSON.stringify(data));
      return footerLinks;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  ["footer"],
  {
    tags: ["footer"],
    revalidate: 60 * 60 * 24,
  },
);

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

//// REVIEW ACTIONS

export const fetchReviews = unstable_cache(
  async ({ limit = 4 }: { limit?: number }): Promise<ReviewType[]> => {
    try {
      await connectToDatabase();
      const data = await Review.find({}).limit(limit);
      const reviews: ReviewType[] = JSON.parse(JSON.stringify(data));
      return reviews;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  ["reviews"],
  {
    tags: ["reviews"],
    revalidate: 60 * 60 * 24,
  },
);

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
    await connectToDatabase();
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
    await connectToDatabase();
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
    await connectToDatabase();
    await Review.findByIdAndUpdate(data.id, data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/reviews");
};

// Collections actions

export const fetchCollections = unstable_cache(
  async () => {
    try {
      await connectToDatabase();
      const data = await Collection.find({});
      const collections: CollectionType[] = JSON.parse(JSON.stringify(data));
      return collections;
    } catch (error) {
      console.error("Error fetching collections:", error);
      throw error;
    }
  },
  ["collections"],
  {
    tags: ["collections"],
    revalidate: 60 * 60 * 24,
  },
);

export const addNewCollection = async (formData: FormData) => {
  const data = {
    name: formData.get("name")?.toString() || "",
    image: formData.get("image")?.toString() || "",
    url: formData.get("url")?.toString() || "",
  };
  try {
    await connectToDatabase();
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
    await connectToDatabase();
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
    await connectToDatabase();
    await Collection.findByIdAndUpdate(data.id, data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/store/collections");
};

// nav bar actions

export const fetchNavbarLinks = unstable_cache(
  async () => {
    try {
      await connectToDatabase();
      const data = await NavBarLink.find({});
      const navbarLinks: NavbarType[] = JSON.parse(JSON.stringify(data));
      return navbarLinks;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  ["navbarLinks"],
  {
    tags: ["navbarLinks"],
    revalidate: 60 * 60 * 24,
  },
);

export const addNewNavbarLink = async (formData: FormData) => {
  const data = {
    title: formData.get("title")?.toString() || "",
    main: formData.get("main")?.toString() === "main" || false,
    url: formData.get("url")?.toString() || "",
  };
  try {
    await connectToDatabase();
    await NavBarLink.create(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/store/navbar");
};

export const updateNavbarLink = async (formData: FormData) => {
  const data = {
    id: formData.get("id")?.toString() || "",
    title: formData.get("title")?.toString() || "",
    main: formData.get("main")?.toString() === "main" || false,
    url: formData.get("url")?.toString() || "",
  };
  try {
    await connectToDatabase();
    await NavBarLink.findByIdAndUpdate(data.id, data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/store/navbar");
};

export const removeNavbarLink = async (formData: FormData) => {
  const id = formData.get("id")?.toString() || "";
  if (!id) return;
  try {
    await connectToDatabase();
    await NavBarLink.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/store/navbar");
};
