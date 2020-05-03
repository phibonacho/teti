// SCSS
import "../scss/admin_detail.scss";

// JS
import "./components/fontawesome";
import "./components/navbar";
import "./components/sidebar";

// VUE
import axios from 'axios';
import {FormPlugin, FormInputPlugin, OverlayPlugin, ModalPlugin, TablePlugin, PaginationPlugin, SpinnerPlugin} from "bootstrap-vue";

Vue.use(FormPlugin);
Vue.use(FormInputPlugin);
Vue.use(OverlayPlugin);
Vue.use(ModalPlugin);
Vue.use(TablePlugin);
Vue.use(PaginationPlugin);
Vue.use(SpinnerPlugin);

let emptyIS =  {
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
    },
    administrator : {
        id : window.administratorID
    }
}

function deepCopy(that) {
    return JSON.parse(JSON.stringify(that));
}

new Vue({
    el : '#app',
    data : {
        is_url : '/is-api',
        saveOverlay: false,
        search_is : deepCopy(emptyIS),
        save_is :  deepCopy(emptyIS),
        edit_is :  deepCopy(emptyIS),
        delete_is : undefined,
        is_page : 1,
        is_size : 10,
        is_rows : 0,
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
        reloadData (event) {
            if(event !== undefined)
                event.preventDefault();
            this.$root.$emit('bv::refresh::table', 'is-table');
        },
        saveData (event) {
            event.preventDefault();
            this.saveOverlay = true;
            let promise = axios.post(`/adm-api/${window.administratorID}/add-is`, this.save_is)
            promise.then(response => {
                // clean form...
                this.save_is = deepCopy(emptyIS);
                this.$root.$emit('bv::refresh::table', 'is-table');
            }).catch(response => {
                console.log(response);
            }).then(response => {
                this.saveOverlay = false;
            });
        },
        editData (event) {
            event.preventDefault();
            let promise = axios.put(`/is-api/${this.edit_is.id}/edit`, this.edit_is)
            promise.then(response => {
                // clean form...
                this.$root.$emit('bv::refresh::table', 'is-table');
                this.$root.$emit('bv::hide::modal', 'edit-modal');
                this.edit_is = deepCopy(emptyIS);
            }).catch(response => {
                console.log(response);
            }).then(response => {

            });
        },
        deleteData(event) {
            event.preventDefault();
            let promise = axios.delete(`/is-api/${this.delete_is}/delete`);

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
            this.toggleBusy(true);
            let promise = axios.post( `${ctx.apiUrl}/${ctx.currentPage}/${ctx.perPage}`, this.search_is);
            return promise.then(response => {
                this.toggleBusy(false);
                return response.data.data;
            }).catch(error => {
                console.log(error)
            }).then(response => {
                this.toggleBusy(false);
            });
        },
        toggleBusy(state = undefined) {
            if(state === undefined)
                this.isBusy = !this.isBusy;
            else
                this.isBusy = state;
        },
        editModal(id) {
            let promise = axios.get(`/is-api/id/${id}`);
            promise.then(response => {
                // load data and show modal
                this.edit_is = response.data;
                // set admin
                this.$root.$emit('bv::show::modal', 'edit-modal');
            }).catch(response => {
                // show error message
            }).then(response => {

            })
        },
        deleteModal(id) {
            this.delete_is = id;
            this.$root.$emit('bv::show::modal', 'delete-modal');
        },
    }
});