// SCSS
import "../scss/admin_detail.scss";

// JS
import "./components/fontawesome"

// VUE
import "./vue/side-bar";
import asyncTable from "./vue/async-table"
import Vue from "vue";
import axios from 'axios';
import {FormPlugin, FormInputPlugin, OverlayPlugin} from "bootstrap-vue";

Vue.component('async-table', asyncTable);
Vue.use(FormPlugin);
Vue.use(FormInputPlugin);
Vue.use(OverlayPlugin);


new Vue({
    el : '#app',
    data : {
        search : {
            businessName : '',
            fiscalCode : '',
            phone : '',
            mobilePhone : '',
            fax : '',
            note : '',
            address : {
                street : '',
                streetNumber : '',
                zipCode : '',
                city : ''
            }
        },
        saveOverlay: false,
        save : {
            businessName : '',
            fiscalCode : '',
            phone : '',
            mobilePhone : '',
            fax : '',
            note : '',
            address : {
                street : '',
                streetNumber : '',
                zipCode : '',
                city : ''
            }
        },
    },
    methods : {
        reloadData (event) {
            event.preventDefault();
            this.$root.$emit('bv::refresh::table', 'adm-table');
        },
        saveData (event) {
            event.preventDefault();
            this.saveOverlay = true;
            let promise = axios.post('/adm-api/save', this.save)
            promise.then(response => {
                // clean form...
                this.$root.$emit('bv::refresh::table', 'adm-table');
            }).catch(response => {
                console.log(response);

            }).then(response => {
                this.saveOverlay = false;
            });
        },
        editData (event) {

        }
    }
});