const header = require("./header");

module.exports = {
  create: () => {
    return `
            ${header}
                <form action="/create" method="post" class="create-container">
                    <input class="create-input" type="text" name="title" placeholder="Title" required="required" />
                    <input class="create-input" type="text" name="price" placeholder="Price" required="required" />
                    <input class="create-input" type="text" name="img" placeholder="Image Url" required="required" />
                    <input class="create-input" type="text" name="url" placeholder="Purchase Link" required="required" />
                    <Textarea class="create-textarea" name="description" placeholder="Description" required="required"></Textarea>
                    <input type="submit" value="submit" class="create-button"/>
                </form>
            </html>
            `;
  },
  index: data => {
    const items = data
      .map(item => {
        return `
                <div class="item">
                    <div class="item-img">
                        <a href="/${item.id}">
                        <img class="index-img" src="${item.img}" />
                        </a>
                    </div>
                    <a href="/${item.id}">
                        <div class="item-text">
                            <p class="item-title">${item.title}</p>
                            <p class="item-price">${item.price}</p>
                        </div>
                    </a>
                </div>`;
      })
      .join("");

    return `
        ${header}
            <div class="container">
                ${items}
            </div>
            </body>
        </html>
              `;
  },
  delete: data => {
    const items = data
      .map(item => {
        return `
                  <div class="item">
                        <div class="item-img">
                            <a href="/${item.id}">
                                <img class="index-img" src="${item.img}" />
                            </a>
                        </div>
                        <a href="/${item.id}">
                            <div class="item-text">
                                <p class="item-title">${item.title}</p>
                            </div>
                        </a>
                            <span class="item-price">${item.price}</span>
                            <span style="text-align: right">
                                <a href="/delete/${item.id}">
                                    <i class="far fa-trash-alt" style="color: orange"></i>
                                </a>
                            </span>
                      </div>`;
      })
      .join("");

    return `
        ${header}
            <div class="container">
                ${items}
            </div>
            </body>
        </html>
                `;
  },
  detail: (title, price, img, description, url) => {
    return ` ${header}
                <div class="item-detail">
                    <h1>${title}</h1>
                    <h2>${price}</h2>
                    <img src="${img}" width="300px" />
                    <p>${description}</p>
                    <button class="item-buy">
                    <a href="${url}">Buy</a></button>
                </div>
            </body>
            </html>
                `;
  }
};
