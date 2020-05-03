// SCSS
import "../scss/admin.scss";

// JS
import "./components/fontawesome";
import "./components/navbar";

// VUE
import "./vue/side-bar";
import Vue from "vue";
import axios from 'axios';
import {FormPlugin, FormInputPlugin, OverlayPlugin, ModalPlugin, TablePlugin, SpinnerPlugin} from "bootstrap-vue";
import Spinner from './vue/my-spinner';

Vue.use(FormPlugin);
Vue.use(FormInputPlugin);
Vue.use(OverlayPlugin);
Vue.use(ModalPlugin);
Vue.use(TablePlugin);
Vue.use(SpinnerPlugin);
Vue.component('my-spinner', Spinner);

let emptyAdmin =  {
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
}

new Vue({
    el : '#app',
    data : {
        adm_url : '/adm-api',
        saveOverlay: false,
        search_admin : deepCopy(emptyAdmin),
        save_admin : deepCopy(emptyAdmin),
        edit_admin : deepCopy(emptyAdmin),
        delete_admin : null,
        fields: [
            {
                key: 'businessName',
                label: 'Ragione Sociale'
            },
            {
                key: 'contacts',
                label: 'Contatti',
                formatter : (value, key, item) => [item.phone, item.mobilePhone, item.fax]
                    .filter(elem => !!elem)
                    .join(" - ")
            },
            {
                key: 'address',
                label: 'Indirizzo',
                formatter : (value) => [value.street, value.streetNumber, value.zipCode, value.city]
                    .filter(elem => !!elem)
                    .join(', ')
            },
            {
                key : 'relatedInvoiceSubjects',
                label : 'S.F. associati',
                formatter : (value) => value.length,
                tdClass : 'text-center'
            },
            {
                key : 'id',
                label : ''
            }
        ],
        isBusy: true,
        items : [],
    },
    methods : {
        reloadData (event) {
            if(event !== undefined)
                event.preventDefault();
            this.$root.$emit('bv::refresh::table', 'adm-table');
        },
        saveData (event) {
            event.preventDefault();
            this.saveOverlay = true;
            let promise = axios.post('/adm-api/save', this.save_admin)
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
            event.preventDefault();
            let promise = axios.put(`/adm-api/${this.edit_admin.id}/edit`, this.edit_admin)
            promise.then(response => {
                // clean form...
                this.$root.$emit('bv::refresh::table', 'adm-table');
                this.$root.$emit('bv::hide::modal', 'edit-modal');
            }).catch(response => {
                console.log(response);

            }).then(response => {
                this.saveOverlay = false;
            });
        },
        deleteData(event) {
            event.preventDefault();
            let promise = axios.delete(`/adm-api/${this.delete_admin}/delete`);

            promise.then(response =>{
                this.$root.$emit('bv::refresh::table', 'adm-table');
                this.$root.$emit('bv::hide::modal', 'delete-modal');
            }).catch(error=> {
                console.log(error);
            }).then(()=>{
                this.reloadData();
            })
        },
        provider (ctx) {
            let promise = axios.post( `${ctx.apiUrl}/${ctx.currentPage}/${ctx.perPage}`, this.search_admin);
            return promise.then(response => {
                this.toggleBusy();
                let data = response.data.data;
                data.forEach(item => {
                    let ris = item.relatedInvoiceSubjects.length;
                    item._rowVariant = ris > 5
                        ? 'green'
                        : ris === 0
                            ? 'ed'
                            : 'hh';
                })
                return data;
            });
        },
        toggleBusy(state = undefined) {
            if(state === undefined)
                this.isBusy = !this.isBusy;
            else
                this.isBusy = state;
        },
        editModal(id) {
            let promise = axios.get(`/adm-api/id/${id}`);
            promise.then(response => {
                // load data and show modal
                console.log(response.data);
                this.edit_admin = response.data;
                this.$root.$emit('bv::show::modal', 'edit-modal');
            }).catch(response => {
                // show error message
            }).then(response => {

            })
        },
        deleteModal(id) {
            this.delete_admin = id;
            this.$root.$emit('bv::show::modal', 'delete-modal');
        },
    }
});

function deepCopy(that) {
    return JSON.parse(JSON.stringify(that));
}