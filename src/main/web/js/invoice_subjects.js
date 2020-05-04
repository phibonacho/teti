// SCSS
import "../scss/invoice_subjects.scss";

// JS
import "./components/fontawesome";
import "./components/navbar";
import "./components/sidebar";

// VUE
import axios from 'axios';
import {FormPlugin, FormInputPlugin, TablePlugin, PaginationPlugin, SpinnerPlugin, OverlayPlugin} from "bootstrap-vue";

Vue.use(FormPlugin);
Vue.use(FormInputPlugin);
Vue.use(TablePlugin);
Vue.use(PaginationPlugin);
Vue.use(SpinnerPlugin);
Vue.use(OverlayPlugin);

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
    administrator : null
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
        provider (ctx) {
            this.toggleBusy(true);
            return axios
                .post( `${ctx.apiUrl}/${ctx.currentPage}/${ctx.perPage}`, this.search_is)
                .then(response => {
                    console.log(response.data);
                    this.toggleBusy(false);
                    this.is_rows = response.data.recordsTotal;
                    return response.data.data;
                }).catch(error => {
                    this.toggleBusy(false);
                    console.log(error);
                });
        },
        toggleBusy(state = undefined) {
            if(state === undefined)
                this.isBusy = !this.isBusy;
            else
                this.isBusy = state;
        }
    }
});