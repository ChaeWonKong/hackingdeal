module.exports = {
  HTML: (title, price, img, description, url) => {
    return `<html>
        <head>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">            <link rel="stylesheet" href="./main.css" />
        </head>
        <body>
            <header class="header">
            <a href="/" class="header-logo">Monsterdeals</a>
                <div class="header-right">
                <ul class="header-ul">
                    <li class="header-li">HOME</li>
                    <li class="header-li">카테고리</li>
                    <li class="header-li">내게맞는상품</li>
                    <li class="header-li">상품등록</li>
                    <li class="header-li">구매가이드</li>
                </ul>
                <div class="header-search-box">
                <i class="fas fa-search" style="margin: 0 10px"></i>
                <input class="header-search" type="text" placeholder="search"></input>
                </div>
                    <button class="auth">Sign In/Up</button>
                    <i id="cart"class="fas fa-shopping-cart"></i>
            </header>
            <div class="item-detail">
                <h1>${title}</h1>
                <h2>${price}</h2>
                <img src="${img}" width="300px" />
                <p>${description}</p>
                <button class="item-buy">
                <a href="${url}">Buy</a></button>
            </div>
        </body>
            `;
  }
};
