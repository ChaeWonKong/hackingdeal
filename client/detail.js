module.exports = {
  HTML: ({ title, price, img, description, url }) => {
    return `<h1>${title}</h1>
            <h2>${price}</h2>
            <img src="${img}" width="300px" />
            <p>${description}</p>
            <a href="${url}">Link</a>
            `;
  }
};
