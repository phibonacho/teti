// SCSS
import "../scss/index.scss";

// JS
import "bootstrap/js/dist/modal";
import "./components/fontawesome";
import "./components/navbar";
import "./components/sidebar";
import {Form} from "./components/utilities/Form";

let $add_admin_form;
let $add_admin_modal;
$(()=>{
    $add_admin_form = $('#add-admin-form');
    $add_admin_modal = $('#add-admin-modal');
    init_admin_form();
});

function init_admin_form() {
    $add_admin_form.on('submit', function (e) {
        e.preventDefault();
        let form = new Form($add_admin_form);
        if(form.validate()) {
            $add_admin_modal.modal('show');
            form.submit()
                .done(response => {
                    $add_admin_modal.modal('hide');

                })
                .fail(response => {

                });
        }
    });
}