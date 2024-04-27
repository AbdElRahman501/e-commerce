import { CustomInput, SearchField } from "@/components";
import CustomTable from "@/components/CustomTable";
import ActionButtons from "@/components/dashboard/ActionButtons";
import AddModal from "@/components/dashboard/AddModal";
import AddNewButton from "@/components/dashboard/AddNewButton";
import EditModal from "@/components/dashboard/EditModal";
import RemoveModal from "@/components/dashboard/RemoveModal";
import ImageInput from "@/components/ImageInput";
import Modal from "@/components/Modal";

import {
  addNewNavbarLink,
  addNewStory,
  fetchAllStories,
  fetchFooterLinks,
  fetchNavbarLinks,
  removeNavbarLink,
  removeStory,
  updateNavbarLink,
  updateStory,
} from "@/lib/actions/store.actions";
import { checkDateStatus } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function OrdersPage() {
  const stories = await fetchAllStories();
  const navBarLinks = await fetchNavbarLinks();
  const footerLinks = await fetchFooterLinks();

  return (
    <Suspense>
      <div className="flex flex-col gap-5 p-5 lg:p-20">
        <div className="flex flex-col gap-2">
          <CustomTable
            name="story"
            data={stories.map((item) => ({
              ...item,
              status: checkDateStatus(item.start, item.end),
            }))}
            inputObj={{
              image: "!image",
              start: "date",
              end: "date",
              url: "text",
            }}
            addAction={addNewStory}
            editAction={updateStory}
            removeAction={removeStory}
            ActionComponent={(item) => (
              <ActionButtons name="story" id={item._id} />
            )}
            header={["image", "start", "end", "status", "url"]}
          />
        </div>
        <div className="flex flex-col gap-2">
          <CustomTable
            name="navbar"
            inputObj={{ title: "!text", url: "!text", main: "checkbox" }}
            data={navBarLinks}
            header={["title", "main", "url"]}
            addAction={addNewNavbarLink}
            editAction={updateNavbarLink}
            removeAction={removeNavbarLink}
            ActionComponent={(item) => (
              <ActionButtons name="navbar" id={item._id} />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <CustomTable
            name="footer"
            data={footerLinks.map((item) => ({
              ...item,
              allLinks: item.links
                .map((link) => "title: " + link.name + " - link :  " + link.url)
                .join(" \n "),
            }))}
            inputObj={{ title: "!text", links: "!text" }}
            header={["title", "allLinks"]}
            ActionComponent={(item) => (
              <ActionButtons name="footer" id={item._id} />
            )}
          />
        </div>
      </div>
    </Suspense>
  );
}
