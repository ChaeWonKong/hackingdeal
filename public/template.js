const header = require("./header");
const commentHTML = require("./comment");

module.exports = {
  create: () => {
    const relatedItems = n => {
      let HTML = ``;
      for (let i = 1; i <= n; i++) {
        HTML += `<div>
            <span>${i}. </span>
            <input name="relatedTitle" placeholder="title" />
            <input name="relatedPrice" placeholder="price" />
            <input name="relatedLink" placeholder="purchase Link" />
            <input name="relatedImg" type="file" name="related-img" placeholder="image" />
        </div> `;
      }
      return HTML;
    };
    return `
            ${header}
                <form id="create-form" action="/create" method="post" class="create-container" enctype="multipart/form-data">
                    <input class="create-input" type="text" name="title" placeholder="Title" required="required" />
                    <input class="create-input" type="text" name="price" placeholder="Price" required="required" />
                    <input class="create-input" type="text" name="img" placeholder="Image Url" />
                    <input class="create-input" type="file" name="uploaded" />
                    <input class="create-input" type="text" name="url" placeholder="Purchase Link" required="required" />
                    <Textarea class="create-textarea" name="description" placeholder="Description" required="required"></Textarea>
                    <p>Add Related Items</p>
                    ${relatedItems(8)}
                    
                    <br />
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
                <div class="sub-container">
                    ${items}
                </div>
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
  detail: (id, title, price, img, description, url, comments) => {
    const commentItem = comments
      ? comments
          .map(comment => {
            return `
        <div class="comment">
        <span class="comment-name">${comment.nickName}</span>
        <span class="comment-content">${comment.date}</span>
        <p class="comment-content">${comment.content}</p>
        </div>
        `;
          })
          .join("")
      : "";

    return `
    ${header}
    <div class="container">
        <div class="detail-contaienr">
            <div class="detail-header">
                <h4 class="detail-category">CATEGORY > CATEGORY</h4>
                <hr class="detail-hr"/>
                <h2 class="detail-h2">${title}</h2>
            </div>
            <div class="detail-conA">
                <div class="detail-img"><img class="materialboxed detail-main-img" src="${img}" /></div>
                <div class="detail-shopInfo">
                    <div class="detail-price-box">
                        <p class="price-ratio">10%</p>
                        <p class="price">${price}</p>
                        <p class="time-elapse">38mins ago</p>
                    </div>
                    <table class="detail-table">
                        <tr>
                            <th>타입</th>
                            <th>가격</th>
                            <th>기준일</th>
                        </tr>
                        <tr>
                            <td>최저가</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                            <td>평균가</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                    </table>
                    <ul>
                        <li>상품요약</li>
                        <li>상품요약</li>
                        <li>상품요약</li>
                        <li>상품요약</li>
                    </ul>
                    <div class="btn-buy-container">
                        <button class="btn-buy" onclick="window.open('${url}')">Shop Now</button>
                    </div>
                </div>
            </div>
            <hr class="detail-hr"/>
            <div class="detail-conB">
                ${description}
            </div>
            <div class="comment-container">
            ${commentItem}
            </div>
            ${commentHTML(id)}
        </div>
    </div>
</body>
</html>
                `;
  }
};
