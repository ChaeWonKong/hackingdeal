module.exports = {
  create: () => {
    return `<html>
              <head>
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
                <link rel="stylesheet" href="./main.css" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

                <title>Monster Deals</title>
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
                    <a href="/${item.id}"><div class="item-text">
                        <p class="item-title">${item.title}</p>
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
    
        
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
        <link rel="stylesheet" href="./main.css" />
    
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
        
    
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
        <div class="container">
            ${items}
        </div>
        </body>
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
                      <a href="/${item.id}"><div class="item-text">
                          <p class="item-title">${item.title}</p></a>
                          <span class="item-price">${item.price}</span>
                          <span style="text-align: right"><a href="/delete/${
                            item.id
                          }"><i class="far fa-trash-alt" style="color: orange"></i></a></span>
                      </div></div>`;
      })
      .join("");

    return `
                <html lang="ko">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Monster Deals</title>
      
          
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
          <link rel="stylesheet" href="./main.css" />
      
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
          
      
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
        <div class="container">
            ${items}
        </div>
        </body>
                `;
  },
  detail: (title, price, img, description, url) => {
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
