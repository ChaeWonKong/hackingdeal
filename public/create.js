module.exports = {
  HTML: () => {
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
  }
};
