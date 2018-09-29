const truncate = require("truncate");

module.exports = {
  HTML: data => {
    const items = data
      .map(item => {
        const itemId = String(Number(item.id) + 1);
        return `
            <div class="item">
                <div class="item-img">
                    <a href="/${itemId}">
                    <img class="index-img" src="${item.img}" />
                    </a>
                </div>
                <a href="/${itemId}"><div class="item-text">
                    <p class="item-title">${truncate(`${item.title}`, 30)}</p>
                    <p class="item-price">${item.price}</p>
                </div></a></div>`;
      })
      .join("");

    return `
          <html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Monster Deals</title>

    
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="stylesheet" href="./main.css" />
    

</head>
<body>
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
    <div class="container">
        ${items}
    </div>
          `;
  }
};
