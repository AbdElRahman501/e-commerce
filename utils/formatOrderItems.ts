import { CartProduct } from "@/types";
import { formatPrice, getImageUrl } from ".";

const formatOrderItems = (products: CartProduct[]): string => {
  return products
    .map(
      (item) => `<tr>
      <td
        class="column column-1"
        width="50%"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          font-weight: 400;
          text-align: left;
          padding: 20px;
          vertical-align: top;
          border-top: 0px;
          border-right: 0px;
          border-bottom: 0px;
          border-left: 0px;
        "
      >
        <table
          class="image_block block-1"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          "
        >
          <tr>
            <td
              class="pad"
              style="
                width: 100%;
                padding-right: 0px;
                padding-left: 0px;
              "
            >
              <div
                class="alignment"
                align="left"
                style="line-height: 10px"
              >
                <div
                  class="fullWidth"
                  style="max-width: 290px"
                >
                <a
                href="{{HOST_URL}}/product/${item.id}?${Object.entries(
                  item.selectedOptions,
                )
                  .map(([key, value]) => key + "=" + value)
                  .join("&")}"
                style="outline: none"
                tabindex="-1"
                target="_blank"
                ><img
                  alt="I'm an image"
                  height="auto"
                  src="${getImageUrl(item.variations, item.selectedOptions) || item.images[0]}"
                  style="
                    display: block;
                    height: auto;
                    border: 0;
                    width: 100%;
                  "
                  title="I'm an image"
                  width="250"
              /></a>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </td>
      <td
        class="column column-2"
        width="50%"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          font-weight: 400;
          text-align: left;
          padding: 20px;
          vertical-align: top;
          border-top: 0px;
          border-right: 0px;
          border-bottom: 0px;
          border-left: 0px;
        "
      >
        <table
          class="paragraph_block block-1"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            word-break: break-word;
          "
        >
          <tr>
            <td class="pad" style="padding-top: 50px">
              <div
                style="
                  color: #555555;
                  font-family: &quot;Roboto&quot;, Tahoma,
                    Verdana, Segoe, sans-serif;
                  font-size: 20px;
                  font-weight: 400;
                  line-height: 150%;
                  text-align: left;
                  mso-line-height-alt: 30px;
                "
              >
                <p
                  style="margin: 0; word-break: break-word"
                >
                  <span style="color: #2b303a"
                    ><strong
                      >${item.title}</strong
                    ></span
                  >
                </p>
                <p
                  style="margin: 0; word-break: break-word"
                >
                ${formatPrice(item.price, "EGP")}
                </p>
              </div>
            </td>
          </tr>
        </table>
        <table
          class="paragraph_block block-2"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            word-break: break-word;
          "
        >
          <tr>
            <td class="pad" style="padding-top: 16px">
              <div
                style="
                  color: #555555;
                  font-family: &quot;Roboto&quot;, Tahoma,
                    Verdana, Segoe, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 150%;
                  text-align: left;
                  mso-line-height-alt: 21px;
                "
              >
                <p
                  style="margin: 0; word-break: break-word"
                >
                <span style="color: #808389"
                    >${Object.values(item.selectedOptions).join(" / ")}</span
                </p>
                <p
                  style="margin: 0; word-break: break-word"
                >
                  <span style="color: #808389"
                    >Quantity: ${item.amount}</span
                  >
                </p>
                
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`,
    )
    .join("");
};

export default formatOrderItems;
