// SCSS
import "../scss/admin_detail.scss";

// JS
import "./components/fontawesome"

// VUE
import "./vue/side-bar";
import Vue from "vue";
import axios from 'axios';
import {FormPlugin, FormInputPlugin, OverlayPlugin, ModalPlugin, TablePlugin, SpinnerPlugin} from "bootstrap-vue";

Vue.use(FormPlugin);
Vue.use(FormInputPlugin);
Vue.use(OverlayPlugin);
Vue.use(ModalPlugin);
Vue.use(TablePlugin);
Vue.use(SpinnerPlugin);
Vue.use(OverlayPlugin);

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
        save : emptyAdmin,
        edit : emptyAdmin,
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
                key : 'id',
                label : ''
            }
        ],
        isBusy: true,
        items : [],
    },
    methods : {
        reloadData () {
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
            event.preventDefault();
            let promise = axios.post(`/adm-api/${this.edit.id}`, this.edit)
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
        deleteData(id) {
            let promise = axios.delete(`/adm-api/${id}/delete`);

            promise.then(response =>{

            }).catch(response=> {

            }).then(()=>{
                this.reloadData();
            })
        },
        provider (ctx) {
            let promise = axios.post( `${ctx.apiUrl}/${ctx.currentPage}/${ctx.perPage}`, this.search);
            return promise.then(response => {
                this.toggleBusy();
                return response.data.data;
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
                this.edit = response;
                console.log('showing modal: ');
                this.$root.$emit('bv::show::modal', 'edit-modal');
            }).catch(response => {
                // show error message
            }).then(response => {

            })

        },
        execute() {
            let promise = axios.delete(`/adm-api/${this.processing.target}/delete`);
            promise.then(response => {
                console.log("done!");
            }).catch(response => {
                console.log(response);
            }).then(response => {
                this.dismiss();
            });
        },
        dismiss() {
            this.processing.target = undefined;
            this.processing.status = false;
        }
    }
});