import './js/common';

import './assets/images/kafedra.jpg';

let css;
if (process.env.NODE_ENV === 'development') css = require('./scss/_main.scss');
