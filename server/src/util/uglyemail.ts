type Item = {
  price: string;
  itemURL: string;
  title: string;
  imageURL: string;
};

export const uglyEbayItem = (item: Item) => {
  const { price, itemURL, title, imageURL } = item;

  const image = imageURL
    ? `<td><img src="${imageURL}" alt="" width="96" height="96" style="display: block;" /></td>`
    : "";
  return `
    <tr>
      <td width="260" valign="top">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr style="cursor:pointer"
            onclick="window.open('${itemURL}')">
            ${image}
            <td style="padding: 0 0 0 0;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 0 0 0 0;">
                    ${title}
                  </td>
                <tr>
                  <td style="padding: 0 0 0 0;">
                    US $${price}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
};
