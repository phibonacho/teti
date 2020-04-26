// SCSS
import "../scss/admin_detail.scss";

// VUE
import "./vue/side-bar";
import asyncTable from "./vue/async-table"
import Vue from "vue";
import {FormPlugin, FormInputPlugin} from "bootstrap-vue";

Vue.component('async-table', asyncTable);
Vue.use(FormPlugin);
Vue.use(FormInputPlugin);


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
    },
    methods : {
        reloadData (event) {
            event.preventDefault();
            console.log("reloading data using filters: ");
            console.log(this.search);
            this.$root.$emit('bv::refresh::table', 'adm-table')
        }
    }
});