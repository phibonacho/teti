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
let $edit_admin_form;

let $info_admin_modal;
let $edit_admin_modal;

let $adminTable;
let adminTable;
$(()=>{
    $add_admin_form = $('#add-admin-form');
    $edit_admin_form = $('#edit-admin-form');

    $info_admin_modal = $('#add-admin-modal');
    $edit_admin_modal = $('#edit-admin-modal');

    $adminTable = $('#administrators-table');

    init_form($add_admin_form);
    init_form($edit_admin_form);
    init_admin_table();
});

function init_form($selector) {
    $selector.on('submit', function (e) {
        let $this = $(this);
        e.preventDefault();
        let form = new Form($this);

        if(form.validate()) {
            $info_admin_modal.modal('show');
            form.submit()
                .done(response => {
                    form.clear();
                    adminTable.ajax.reload();
                    $info_admin_modal.modal('hide');
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
                "render" : data => `<button class="btn btn-ed text-uppercase remove-administrator" data-id="${data}">delete</button>
                                    <button class="btn btn-red text-uppercase edit-administrator" data-id="${data}">edit</button>`
            }
        ]
    });

    $adminTable.on('click', '.remove-administrator', function(e) {
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

    $adminTable.on('click', '.edit-administrator', function(e){
        e.stopPropagation();
        let btn = $(this);
        let id = btn.data('id');

        // retrieve admin data:
        $.ajax({
            url : `/adm-api/${id}`,
            type : 'GET'
        }).done(response => {

            //populate edit form fields:
            let form = new Form($edit_admin_form);
            form.setUrl(form.url().replace(":id", id));
            populateForm(form, response);
        });

        //show modal
        $edit_admin_modal.modal('show');
    });
}

function populateForm(form, source) {
    for(const property in source) {
        if(property !== 'id')
            if(!(source[property] instanceof Object))
                form.fieldByPath(property).setValue(source[property]);
            else {
                populateFormAux(property, form, source[property]);
            }
    }
}

function populateFormAux(prefix, form, source) {
    for(const property in source) {
        let path = `${prefix}.${property}`;
        if(property !== 'id')
            if(!(source[property] instanceof Object))
                form.fieldByPath(path).setValue(source[property]);
            else {
                populateFormAux(path, form, source[property]);
            }
    }
}