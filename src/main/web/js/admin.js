import "../scss/index.scss";
import "./components/navbar";
import "./components/sidebar";
import "./components/form";
import {init_form} from "./components/form";

let $add_admin_form;

$(()=>{
    console.log("calling on ready (maybe?)");
    console.log("boh qualcosa???");
    $add_admin_form = $('#add-admin-form');
    console.log('calling init_form');
    init_form($add_admin_form);
});