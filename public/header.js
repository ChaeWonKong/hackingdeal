module.exports = `
        <html>
            <head>
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
                <link rel="stylesheet" href="./main.css" />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

                <title>Hacking Deal</title>
                    <!-- Global site tag (gtag.js) - Google Analytics -->
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-127462091-1"></script>
                    <script>
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'UA-127462091-1');
                    </script>
                </head>
                <body>

                    <header class="header">
                        <a href="/" class="header-logo">hackingdeal</a>
                            <div class="header-right">
                                <ul class="header-ul">
                                    <li class="header-li">카테고리</li>
                                    <li class="header-li">스테디셀러</li>
                                    <li class="header-li">합배송상품</li>
                                    <li class="header-li">구매가이드</li>
                                </ul>
                                <div class="header-search-box">
                                    <i class="fas fa-search" style="margin: 0 10px"></i>
                                <input class="header-search" type="text" placeholder="search" />
                                </div>
                                    <button class="auth">Sign In/Up</button>
                                    <i id="cart"class="fas fa-shopping-cart"></i>
                            </div>
                    </header>
`;
