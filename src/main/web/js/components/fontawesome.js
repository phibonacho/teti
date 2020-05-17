
import {library, dom} from '@fortawesome/fontawesome-svg-core';
import {faFilter} from '@fortawesome/free-solid-svg-icons/faFilter';

import {faStar as faStarReg} from '@fortawesome/free-regular-svg-icons/faStar';
import {faHeart as faHeartReg} from '@fortawesome/free-regular-svg-icons/faHeart';

import {faInstagram} from '@fortawesome/free-brands-svg-icons/faInstagram';
import{faGithub} from '@fortawesome/free-brands-svg-icons/faGithub';
import{faBootstrap} from '@fortawesome/free-brands-svg-icons/faBootstrap';
import{faYarn} from '@fortawesome/free-brands-svg-icons/faYarn';
import {faSlidersH} from "@fortawesome/free-solid-svg-icons/faSlidersH";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import {faPen} from "@fortawesome/free-solid-svg-icons/faPen";
import {faPortrait} from "@fortawesome/free-solid-svg-icons/faPortrait";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {faAddressCard} from "@fortawesome/free-solid-svg-icons/faAddressCard";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

library.add(
    // solid
    faFilter,
    faSlidersH,
    faSpinner,
    faTrashAlt,
    faPen,
    faPortrait,
    faBars,
    faAddressCard,
    faPlusCircle,
    faPlus,

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