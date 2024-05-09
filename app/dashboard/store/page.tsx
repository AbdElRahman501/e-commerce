import { CustomInput } from "@/components";
import CustomTable from "@/components/CustomTable";
import ActionButtons from "@/components/dashboard/ActionButtons";

import {
  addNewNavbarLink,
  addNewStory,
  fetchAllStories,
  fetchFooterLinks,
  fetchNavbarLinks,
  removeNavbarLink,
  removeStory,
  updateFooterLink,
  updateNavbarLink,
  updateStory,
} from "@/lib/actions/store.actions";
import { checkDateStatus } from "@/utils";
import { Suspense } from "react";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { editFOOTERId } = searchParams as {
    [key: string]: string;
  };
  const stories = await fetchAllStories();
  const navBarLinks = await fetchNavbarLinks();
  const footerLinks = await fetchFooterLinks();
  const selectedFooterLink = footerLinks.find(
    (x: any) => x._id === editFOOTERId || x.id === editFOOTERId,
  );

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
            editAction={updateFooterLink}
            data={footerLinks.map((item) => ({
              ...item,
              allLinks: item.links
                .map((link) => "title: " + link.name + " - link :  " + link.url)
                .join(" \n "),
            }))}
            header={["title", "allLinks"]}
            CustomInputs={
              <>
                <CustomInput
                  placeholder="Enter footer title"
                  name="title"
                  defaultValue={selectedFooterLink?.title}
                  required
                  type="text"
                />
                {selectedFooterLink &&
                  selectedFooterLink.links.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <CustomInput
                        placeholder="Enter footer link name"
                        name="linkName[]"
                        defaultValue={link.name}
                        required
                        type="text"
                      />
                      <CustomInput
                        placeholder="Enter footer link url"
                        name="linkURL[]"
                        defaultValue={link.url}
                        required
                        type="text"
                      />
                    </div>
                  ))}
                <div className="flex gap-2">
                  <CustomInput
                    placeholder="Enter footer link name"
                    name="linkName[]"
                    defaultValue=""
                    required
                    type="text"
                  />
                  <CustomInput
                    placeholder="Enter footer link url"
                    name="linkURL[]"
                    defaultValue=""
                    required
                    type="text"
                  />
                </div>
              </>
            }
            ActionComponent={(item) => (
              <ActionButtons name="footer" id={item._id} />
            )}
          />
        </div>
      </div>
    </Suspense>
  );
}
