
import {library, dom} from '@fortawesome/fontawesome-svg-core';
import {faFilter} from '@fortawesome/free-solid-svg-icons/faFilter';

import {faStar as faStarReg} from '@fortawesome/free-regular-svg-icons/faStar';
import {faHeart as faHeartReg} from '@fortawesome/free-regular-svg-icons/faHeart';

import {faInstagram} from '@fortawesome/free-brands-svg-icons/faInstagram';
import{faGithub} from '@fortawesome/free-brands-svg-icons/faGithub';
import{faBootstrap} from '@fortawesome/free-brands-svg-icons/faBootstrap';
import{faYarn} from '@fortawesome/free-brands-svg-icons/faYarn';
import {faSlidersH} from "@fortawesome/free-solid-svg-icons/faSlidersH";

library.add(
    // solid
    faFilter,
    faSlidersH,
    // regular
    faStarReg,
    faHeartReg,

    // brand
    faInstagram,
    faGithub,
    faBootstrap,
    faYarn
);

dom.watch();