// SCSS
import "../scss/contract_detail.scss";

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

const emptyService =  {
    serviceName : '',
    serviceDeadline : null,
    contract : {
        id : window.contractId
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

const months = [null,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(mon => ({
    value : mon,
    text : mon == null
        ? '---'
        : new Date(2000, mon).toLocaleString({}, {month: 'long'})
}));

const monthName = (id) => {
    if(id == null)
        return months[0];
    return months[id+1].text;
};

new Vue({
    el : '#app',
    data : {
        contract_id : window.contractId,
        service_url : '/ctr-api',
        saveOverlay: false,
        search_service : deepCopy(emptyService),
        save_service :  deepCopy(emptyService),
        edit_service :  deepCopy(emptyService),
        delete_service : undefined,
        service_page : 1,
        service_size : 10,
        service_rows : 0,
        fields: [
            {
                key: 'serviceName',
                label: 'Servizio'
            },
            {
                key: 'formatted_deadline',
                label: 'Scadenza'
            },
            {
                key : 'show_details',
                label : ''
            }
        ],
        isBusy: true,
        months : months
    },
    methods : {
        reloadData (event) {
            if(event !== undefined)
                event.preventDefault();
            this.$root.$emit('bv::refresh::table', 'service-table');
        },
        saveData (event) {
            event.preventDefault();
            this.saveOverlay = true;
            let promise = axios.post(`/ctr-api/${window.contractId}/service/add`, this.save_service)
            promise.then(response => {
                // clean form...
                this.save_service = deepCopy(emptyService);
                this.$root.$emit('bv::refresh::table', 'service-table');
            }).catch(response => {
                console.log(response);
            }).then(response => {
                this.saveOverlay = false;
            });
        },
        editData (event) {
            event.preventDefault();
            let promise = axios.put(`/srv-api/${this.edit_is.id}/edit`, this.edit_service)
            promise.then(response => {
                // clean form...
                this.$root.$emit('bv::refresh::table', 'is-table');
                this.$root.$emit('bv::hide::modal', 'edit-modal');
                this.edit_is = deepCopy(emptyService);
            }).catch(response => {
                console.log(response);
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
            event.preventDefault();
            let promise = axios.post(`/ctr-api/${this.contract_id}/service/add`, this.save_contract)
            promise.then(response => {
                // clean form...
                this.save_contract = deepCopy(emptyContract);
                this.save_contract_is = null;
                this.save_contract_aux_closingMonth = null;
                this.$root.$emit('bv::refresh::table', 'is-table');
                this.$root.$emit('bv::hide::modal', 'add-contract-modal');
            }).catch(response => {
                console.log(response);
            }).then(response => {
            });
        },
        provider (ctx) {
            this.toggleBusy(true);
            return axios
                .post( `${ctx.apiUrl}/${this.contract_id}/service/${ctx.currentPage}/${ctx.perPage}`, this.search_service)
                .then(response => {
                    this.toggleBusy(false);
                    this.service_rows = response.data.recordsTotal;
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
        },
        editModal(id) {
            let promise = axios.get(`/is-api/id/${id}`);
            promise.then(response => {
                // load data and show modal
                this.edit_service = response.data;
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
        serviceModal(id) {
            this.save_contract_is = id;
            this.$root.$emit('bv::show::modal', 'add-service-modal');
        },
        monthName(id) {
            return monthName(id);
        }
    }
});