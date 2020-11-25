// SCSS
import "../scss/admin_detail.scss";

// JS
import "./components/fontawesome";
import "./components/navbar";
import "./components/sidebar";
import Spinner from "./vue/my-spinner";

// VUE
import axios from 'axios';
import {
    FormPlugin, FormInputPlugin, FormSelectPlugin,
    OverlayPlugin, ModalPlugin, SpinnerPlugin,
    TablePlugin, PaginationPlugin,
    CardPlugin, InputGroupPlugin, ListGroupPlugin, BadgePlugin
} from "bootstrap-vue";
import {edit, provider, reload, save, remove} from "./components/utilities/dataUtils";

Vue.use(FormPlugin);
Vue.use(FormInputPlugin);
Vue.use(OverlayPlugin);
Vue.use(ModalPlugin);
Vue.use(TablePlugin);
Vue.use(PaginationPlugin);
Vue.use(SpinnerPlugin);
Vue.use(FormSelectPlugin);
Vue.use(CardPlugin);
Vue.use(InputGroupPlugin);
Vue.use(ListGroupPlugin);
Vue.use(BadgePlugin);

Vue.component("my-spinner", Spinner);

const emptyIS =  {
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
};

const emptyContract = {
    billingMonth : null,
    closingMonths : [],
    billingAmount : null,
    toBill : false,
    notes : '',
};

function deepCopy(that) {
    return JSON.parse(JSON.stringify(that));
}

new Vue({
    el : '#app',
    data : {
        administrator_id : window.administratorID,

        is_page : 1,
        is_size : 10,
        is_rows : 0,
        is_url : '/is-api',

        search_is : deepCopy(emptyIS),
        save_is : deepCopy(emptyIS),
        edit_is : deepCopy(emptyIS),
        delete_is : null,
        saveOverlay: false,

        search_contract : deepCopy(emptyContract),
        save_contract : deepCopy(emptyContract),
        save_contract_is : null,
        save_contract_aux_closingMonth : null,
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
                key : 'contract_info',
                label : 'Contratto'
            },
            {
                key : 'id',
                label : ''
            }
        ],
        isBusy: true,
        items : [],
        months : [null,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(mon => ({
            value : mon,
            text : mon == null
                ? '---'
                : new Date(2000, mon).toLocaleString({}, {month: 'long'})
        }))
    },
    methods : {
        reloadData (event = undefined) {
            reload(event, this.$root, 'is-table');
        },
        saveData (event) {
            save(event, this.$root, `/adm-api/${this.administrator_id}/add-is`, this.save_is, 'is-table', (response => this.save_is = deepCopy(emptyIS)));
        },
        editData (event) {
            edit(event, this.$root, `/is-api/${this.edit_is.id}/edit`, this.edit_is, 'is-table', 'edit-modal');
        },
        deleteData(event) {
            remove(event, this.$root, `/is-api/${this.delete_is}/delete`, 'is-table', 'delete-modal');
        },
        save_contractPCM(event) {
            if(!this.save_contract.closingMonths
                .some(m => m.closingMonth === this.save_contract_aux_closingMonth))
            this.save_contract.closingMonths.push({
                closingMonth : this.save_contract_aux_closingMonth
            });
        },
        delete_contractPCM(index) {
            this.save_contract.closingMonths.splice(index,1);
        },
        saveContract(event) {
            save(event, this.$root, `/is-api/${this.save_contract_is}/contract/add`, this.save_contract, 'is-table', (response => {
                this.save_contract = deepCopy(emptyContract);
                this.save_contract_is = null;
                this.save_contract_aux_closingMonth = null;
                this.$root.$emit('bv::refresh::table', 'is-table');
                this.$root.$emit('bv::hide::modal', 'add-contract-modal');
            }));
        },
        provider (ctx) {
            this.toggleBusy(true);
            return provider(`${ctx.apiUrl}/${ctx.currentPage}/${ctx.perPage}`,
                this.search_is,
                this.is_rows,
                () => this.toggleBusy(false));
        },
        toggleBusy(state = undefined) {
            if(state === undefined)
                this.isBusy = !this.isBusy;
            else
                this.isBusy = state;
        },
        editModal(id) {
            let promise = axios.get(`${this.is_url}/id/${id}`);
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
        contractModal(id) {
            this.save_contract_is = id;
            this.$root.$emit('bv::show::modal', 'add-contract-modal');
        },
        monthName(id) {
            if(id == null)
                return this.months[0];
            return this.months[id+1].text;
        }
    }
});