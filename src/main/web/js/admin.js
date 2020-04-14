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
let $search_admin_form;

let $info_admin_modal;
let $edit_admin_modal;
let editForm;
let $adminTable;
let adminTable;

$(()=>{
    $add_admin_form = $('#add-admin-form');
    $edit_admin_form = $('#edit-admin-form');
    $search_admin_form = $('#search-admin-form');

    $info_admin_modal = $('#info-modal');
    $edit_admin_modal = $('#edit-admin-modal');

    $adminTable = $('#administrators-table');

    init_form($add_admin_form, {
        clearOnSubmitSuccess : true,
        onSuccess : response => {
            adminTable.ajax.reload();
            $info_admin_modal.modal('hide');
        },
        onFail : response => {
            // shows message error
            $info_admin_modal.modal('hide');
        }
    });

    editForm = init_form($edit_admin_form, {
        clearOnSubmitSuccess: true,
        onSuccess : response => {
            adminTable.ajax.reload();
            $edit_admin_modal.modal('hide');
            $info_admin_modal.modal('hide');
        },
        onFail : response => {

        }
    });

    init_admin_table();

    $search_admin_form.on('submit', function(e) {
        e.preventDefault();
        adminTable.ajax.reload();
    });

});

function init_form($selector, option = {}) {
    let form = new Form($selector, option);
    $selector.on('submit', function (e) {
            e.preventDefault();

            if (form.validate()) {
                $info_admin_modal.modal('show');
                form.submit();
            }
    });

    return form;
}

function init_admin_table() {
    adminTable = initDataTable($adminTable, {
        "ajax": {
            "url": "/adm-api/",
            "type": "POST",
            "contentType" : "application/json",
            "data" : () => JSON.stringify(new Form($search_admin_form).toObject())
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
                "render" : data => [data.street, data.streetNumber, data.zipCode, data.city].filter(item => !!item).join(", ")
            },
            {
              "data" : "phone",
              "render" : (data, type, row) => [row.phone, row.mobilePhone].filter(item => !!item).join(" - ")
            },
            {
                "data" : "id",
                "render" : data => `<div class="row justify-content-around">
                                        <a class="py-1 px-2 remove-administrator" href="#" data-id="${data}"><i class="fas fa-trash-alt text-ed"></i></a>
                                        <a class="py-1 px-2 edit-administrator" href="#" data-id="${data}"><i class="fas fa-pen text-primary"></i></a>
                                        <a class="py-1 px-2" href="/registries/administrators/detail/${data}"><i class="fas fa-portrait text-dark"></i></a>
                                    </div>`
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
            url : `/adm-api/id/${id}`,
            type : 'GET'
        }).done(response => {
            //populate edit form fields:
            editForm.setUrl(u => u.replace(':id', id));
            populateForm(editForm, response);
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