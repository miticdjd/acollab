<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
        rel="stylesheet"
    />
    <title>@yield('title')</title>
    <style>
        @media only screen and (max-width: 620px) {
            .ol.container {
                width: 90% !important;
                margin: 0 auto !important;
            }
            .ol.btn-primary {
                width: 100% !important;
            }
        }
        @media all {
            .ol.btn-primary {
                margin: 0 auto;
                display: block;
                color: #FFF !important;
                font-weight: bold;
                font-size: 14px !important;
                line-height: 50px !important;
                width: 200px;
                height: 50px;
                background: #151048;
                border-radius: 3px;
                vertical-align: middle;
                text-decoration: none;
                text-align: center;
            }
            .ol.btn-primary:hover {
                background-color: #241f5e;
            }
            .ol p,
            .ol a {
                font-family: 'Montserrat', sans-serif;
                font-size: 16px;
                color: #001737;
            }
            .ol h1 {
                font-family: 'Montserrat', sans-serif;
                font-size: 20px;
                color: #001737;
            }
            .ol h2 {
                font-family: 'Montserrat', sans-serif;
                font-size: 18px;
                color: #001737;
            }
            .ol h3,
            .ol h4,
            .ol h5,
            .ol h6 {
                font-family: 'Montserrat', sans-serif;
                font-size: 16px;
                color: #001737
            }
            .ol p {
                margin: 0;
                padding: 0;
            }
        }
    </style>
</head>
<body style="background-color: #F7F8FA; font-family: 'IBM Plex Sans', sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
<table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
    <tr>
        <td style="font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        <td class="ol container" style="font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 640px; padding: 10px; width: 640px;">
            <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 640px; padding: 10px;">

                @yield('main_logo')

                <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 5px;">
                    <tr>
                        <td class="wrapper" style="vertical-align: top; box-sizing: border-box; padding: 50px;">
                            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                <tr>
                                    <td style="vertical-align: top; font-family: 'IBM Plex Sans', sans-serif; font-size: 16px; line-height: 21px; color: #001737;">
                                        @yield('main')
                                        @yield('divider')
                                        @yield('bottom')
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                @yield('footer')
            </div>
        </td>
        <td style="vertical-align: top;">&nbsp;</td>
    </tr>
</table>
</body>
</html>
