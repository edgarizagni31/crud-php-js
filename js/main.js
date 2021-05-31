'use strict';

import { displayTable } from './helpers/dom.js';
import { handlerForm, handlerEdit } from './helpers/handlres.js';

// show users
document.getElementById('btn_cargar_usuarios').addEventListener('click', displayTable);

// submit form
document.getElementById('form').addEventListener('submit', (e) => handlerForm(e));

//handle edit
document.getElementById('table').addEventListener('click', (e) => handlerEdit(e))


