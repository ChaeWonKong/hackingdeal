module.exports = {
  HTML: `<html>
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
                <div class="create-container">
                    <input type="text" placeholder="Title" />
                    <input type="text" placeholder="Price" />
                    <input type="text" placeholder="Image Url"/>
                    <input type="text" placeholder="Purchase Link"/>
                    <Textarea placeholder="Description"></Textarea>
                    <button>submit</button>
                </div>
                </html>
            `
};
