import { CartProduct } from "@/types";

const formatOrderItems = (products: CartProduct[]): string => {
  return products
    .map(
      (item) => `
        <tr>
                        <td
                          class="esdev-adapt-off"
                          align="left"
                          style="
                            margin: 0;
                            padding-bottom: 10px;
                            padding-right: 20px;
                            padding-left: 20px;
                            padding-top: 10px;
                          "
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            class="esdev-mso-table"
                            role="none"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                              width: 560px;
                            "
                          >
                            <tr>
                              <td
                                class="esdev-mso-td"
                                valign="top"
                                style="padding: 0; margin: 0"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="es-left"
                                  align="left"
                                  role="none"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                    float: left;
                                  "
                                >
                                  <tr>
                                    <td
                                      class="es-m-p0r"
                                      align="center"
                                      style="padding: 0; margin: 0; width: 70px"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                        "
                                      >
                                        <tr>
                                          <td
                                            align="center"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              font-size: 0px;
                                            "
                                          >
                                            <img
                                              class="adapt-img"
                                              src="${item.images[item.selectedColor]}"
                                              alt=""
                                              style="
                                                display: block;
                                                font-size: 14px;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                              "
                                              width="70"
                                            />
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td style="padding: 0; margin: 0; width: 20px"></td>
                              <td
                                class="esdev-mso-td"
                                valign="top"
                                style="padding: 0; margin: 0"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="es-left"
                                  align="left"
                                  role="none"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                    float: left;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="padding: 0; margin: 0; width: 265px"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                        "
                                      >
                                        <tr>
                                          <td
                                            align="left"
                                            style="padding: 0; margin: 0"
                                          >
                                            <p
                                              style="
                                                margin: 0;
                                                mso-line-height-rule: exactly;
                                                font-family: arial,
                                                  &quot;helvetica neue&quot;,
                                                  helvetica, sans-serif;
                                                line-height: 21px;
                                                letter-spacing: 0;
                                                color: #333333;
                                                font-size: 14px;
                                              "
                                            >
                                              <strong>${item.title}</strong>
                                            </p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            align="left"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              padding-top: 5px;
                                            "
                                          >
                                            <p
                                              style="
                                                margin: 0;
                                                mso-line-height-rule: exactly;
                                                font-family: arial,
                                                  &quot;helvetica neue&quot;,
                                                  helvetica, sans-serif;
                                                line-height: 21px;
                                                letter-spacing: 0;
                                                color: #333333;
                                                font-size: 14px;
                                              "
                                            >
                                              Size: ${item.selectedSize}<br />Color: <span>
                                              <svg
                                                width="20"
                                                height="20"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <circle
                                                  cx="10"
                                                  cy="10"
                                                  r="8"
                                                  fill="${item.selectedColor}"
                                                />
                                              </svg>
                                            </span>
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td style="padding: 0; margin: 0; width: 20px"></td>
                              <td
                                class="esdev-mso-td"
                                valign="top"
                                style="padding: 0; margin: 0"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="es-left"
                                  align="left"
                                  role="none"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                    float: left;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="left"
                                      style="padding: 0; margin: 0; width: 80px"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                        "
                                      >
                                        <tr>
                                          <td
                                            align="center"
                                            style="padding: 0; margin: 0"
                                          >
                                            <p
                                              style="
                                                margin: 0;
                                                mso-line-height-rule: exactly;
                                                font-family: arial,
                                                  &quot;helvetica neue&quot;,
                                                  helvetica, sans-serif;
                                                line-height: 21px;
                                                letter-spacing: 0;
                                                color: #333333;
                                                font-size: 14px;
                                              "
                                            >
                                              ${item.amount} pcs
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td style="padding: 0; margin: 0; width: 20px"></td>
                              <td
                                class="esdev-mso-td"
                                valign="top"
                                style="padding: 0; margin: 0"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="es-right"
                                  align="right"
                                  role="none"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                    float: right;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="left"
                                      style="padding: 0; margin: 0; width: 85px"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                        "
                                      >
                                        <tr>
                                          <td
                                            align="right"
                                            style="padding: 0; margin: 0"
                                          >
                                            <p
                                              style="
                                                margin: 0;
                                                mso-line-height-rule: exactly;
                                                font-family: arial,
                                                  &quot;helvetica neue&quot;,
                                                  helvetica, sans-serif;
                                                line-height: 21px;
                                                letter-spacing: 0;
                                                color: #333333;
                                                font-size: 14px;
                                              "
                                            >
                                              ${item.price} EGP
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>`,
    )
    .join("");
};

export default formatOrderItems;
