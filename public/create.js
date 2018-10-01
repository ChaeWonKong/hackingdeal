module.exports = {
  HTML: () => {
    return `<html>
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
                <link rel="stylesheet" href="./main.css" />
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
