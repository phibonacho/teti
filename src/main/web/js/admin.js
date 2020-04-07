// SCSS
import "../scss/admin.scss";

// JS
import "bootstrap/js/dist/modal";
import "./components/fontawesome";
import "./components/navbar";
import "./components/sidebar";
import {Form} from "./components/utilities/Form";
import {initDataTable} from "./components/dataTables";

let $add_admin_form;
let $add_admin_modal;
let $adminTable;
let adminTable;
$(()=>{
    $add_admin_form = $('#add-admin-form');
    $add_admin_modal = $('#add-admin-modal');
    $adminTable = $('#administrators-table');
    init_admin_form();
    init_admin_table();
});

function init_admin_form() {
    $add_admin_form.on('submit', function (e) {
        e.preventDefault();
        let form = new Form($add_admin_form);
        if(form.validate()) {
            $add_admin_modal.modal('show');
            form.submit()
                .done(response => {
                    form.clear();
                    adminTable.ajax.reload();
                    $add_admin_modal.modal('hide');
                })
                .fail(response => {

                });
        }
    });
}

function init_admin_table() {
    adminTable = initDataTable($adminTable, {
        "ajax": {
            "url": "/adm-api/all",
            "type": "GET"
        },
        "columns": [
            {
                "data": "id"
            },
            {
                "data": "businessName"
            },
            {
                "data" : "address",
                "render" : data => [data.street, data.streetNumber, data.zipCode].filter(item => !!item).join(", ")
            },
            {
              "data" : "phone",
              "render" : (data, type, row) => [row.phone, row.mobilePhone].filter(item => !!item).join(" - ")
            },
            {
                "data" : "id",
                "render" : data => `<button class="btn btn-ed text-uppercase remove-player" data-id="${data}">delete</button>
                                    <button class="btn btn-red text-uppercase edit-player disabled" data-id="${data}" disabled>edit</button>`
            }
        ]
    });
    $adminTable.on('click', '.remove-player', function(e) {
        e.stopPropagation();
        let btn = $(this);
        let id = btn.data('id');
        $.ajax({
            url : `/adm-api/${id}/delete`,
            type : 'DELETE'
        }).done(()=>{
            adminTable.ajax.reload();
        });
    });
}