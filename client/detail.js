module.exports = {
  HTML: (title, price, img, description, url) => {
    return `
            
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
            <header class="header">
                <h1 class="header-h1"><a href="/">MonsterDeal</a></h1>
                <div class="header-right">
                <ul class="header-ul">
                    <li class="header-li">category1</li>
                    <li class="header-li">category2</li>
                    <li class="header-li">category3</li>
                    <li class="header-li">category4</li>
                    <li class="header-li">category5</li>
                </ul>
                    <button class="auth">Sign In/Up</button>
                </div>
            </header>
            <div class="item-detail">
                <h1>${title}</h1>
                <h2>${price}</h2>
                <img src="${img}" width="300px" />
                <p>${description}</p>
                <button class="item-buy">
                <a href="${url}">Buy</a></button>
            </div>
            `;
  }
};
