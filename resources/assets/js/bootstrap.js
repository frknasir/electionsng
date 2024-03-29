window.Popper = require('popper.js').default;
//window._ = require('lodash');
window.L = require('leaflet');
require('leaflet.markercluster');
require('leaflet.heat');

//https://ckeditor.com/ckeditor-5/#classic
window.ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.$ = window.jQuery = require('jquery');

    require('../../../public/js/core/bootstrap-material-design.min.js');
    require('../../../public/js/plugins/perfect-scrollbar.jquery.min.js');
    window.moment = require('moment');
    window.swal = require('../../../public/js/plugins/sweetalert2.js');
    require('../../../public/js/plugins/jquery.validate.min.js');
    require('../../../public/js/plugins/jquery.bootstrap-wizard.js');
    require('../../../public/js/plugins/bootstrap-selectpicker.js');
    require('../../../public/js/plugins/bootstrap-datetimepicker.min.js');
    //require('../../../public/js/plugins/jquery.dataTables.min.js');
    require('../../../public/js/plugins/bootstrap-tagsinput.js');
    require('../../../public/js/plugins/jasny-bootstrap.min.js');
    require('../../../public/js/plugins/fullcalendar.min.js');
    require('../../../public/js/plugins/jquery-jvectormap.js');
    require('../../../public/js/jvector-map-ng.js');
    require('../../../public/js/plugins/nouislider.min.js');
    //require('../../../public/js/plugins/core.js');
    require('../../../public/js/plugins/arrive.min.js');
    //require('../../../public/js/plugins/buttons.js');
    require('../../../public/js/plugins/bootstrap-notify.js');
    require('../../../public/js/material-dashboard.min.js?v=2.1.0');
    //require('../../../public/js/plugins/jquery.sharrre.js');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
