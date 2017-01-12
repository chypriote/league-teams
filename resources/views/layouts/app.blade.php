<!DOCTYPE html>
<html>
    <head>
        <title>League France</title>
        <link rel="stylesheet" href="css/font-awesome.min.css">
        <link rel="stylesheet" href="css/main.min.css">
    </head>

    <body>
        <nav class="navbar">
            <div class="container">
                <div class="nav-item">
                    <a href="/">
                        <span class="icon icon-link"></span> Accueil
                    </a>
                </div>
            </div>
        </nav>

        <div class="main container">
            <div class="columns">
                    @yield('content')
            </div>
        </div>
    </body>
</html>
