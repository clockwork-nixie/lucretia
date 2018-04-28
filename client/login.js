"use strict";

import Api from './data/api';
import Ui from './login/ui';

console.log(
    '%c Clockwork Nixie v[AIV]{version}[/AIV] %c https://github.com/clockwork-nixie',
    'background: linear-gradient(yellow, red); color: white; border-radius: 7px',
    'background: white; color: black;');

const api = new Api();
const ui = new Ui(api);

ui.initialise();
