module.exports = {
  HTML: data => {
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
                  </a>
                      <span><a href="/delete/${
                        item.id
                      }"><i class="fas fa-ban" style="color: orange"></i></a></span>
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
  
      
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      <link rel="stylesheet" href="./main.css" />
  
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
      
  
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
      </body>
            `;
  }
};
