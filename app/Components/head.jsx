import React from 'react';

function MyHead() {
  return (
    <head>
      <meta charset='utf-8' />
      <title>Title</title>

      {/* Favicon */}
      <link rel='icon' type='image/x-icon' href='../../assets/img/favicon/favicon.ico' />

      {/* Fonts */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
      <link href='https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap' rel='stylesheet' />

      {/* Icons */}
      <link rel='stylesheet' href='../../assets/vendor/fonts/boxicons.css' />
      {/* Uncomment required icon fonts */}
      {/* <link rel='stylesheet' href='../../assets/vendor/fonts/fontawesome.css' /> */}

      {/* Core CSS */}
      <link rel='stylesheet' href='../../assets/vendor/css/rtl/core.css' className='template-customizer-core-css' />
      <link rel='stylesheet' href='../../assets/vendor/css/rtl/theme-default.css' className='template-customizer-theme-css' />
      <link rel='stylesheet' href='../../assets/css/demo.css' />

      {/* Vendors CSS */}
      <link rel='stylesheet' href='../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css' />

      {/* Helpers */}
      <script src='../../assets/vendor/js/helpers.js'></script>

      {/* Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section */}
      {/* Template customizer: To hide customizer set displayCustomizer value false in config.js. */}
      <script src='../../assets/vendor/js/template-customizer.js'></script>
      {/* Config: Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file. */}
      <script src='../../assets/js/config.js'></script>
    </head>
  );
}

export default MyHead;