// SCSS
import "../scss/contract_detail.scss";

// JS
import "./components/fontawesome";
import "./components/navbar";
import "./components/sidebar";
import Spinner from "./vue/my-spinner";

// VUE
import {edit, reload, save, remove, provider} from './components/utilities/dataUtils'
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

const emptyMemo =  {
    memoTitle : '',
    memoContent : ''
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
        target_service : undefined,
        service_url : '/ctr-api',
        search_service : deepCopy(emptyService),
        save_service :  deepCopy(emptyService),
        edit_service :  deepCopy(emptyService),
        delete_service : undefined,
        save_memo :  deepCopy(emptyMemo),
        edit_memo :  deepCopy(emptyMemo),
        delete_memo :  undefined,
        service_page : 1,
        service_size : 10,
        service_rows : 0,
        memo_page : 1,
        memo_size : 10,
        memo_rows : 0,
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
                key : 'id',
                label : ''
            }
        ],
        memo_fields: [
            {
                key: 'memoTitle',
                label: 'Memo'
            },
            {
                key: 'actions',
                label: '',
                class: 'text-right'
            }
        ],
        isBusy: true,
        isMemoBusy: true,
        months : months,
        displayMemo : []
    },
    methods : {
        reloadData (event) {
            reload(event, this.$root, 'service-table');
        },
        reloadMemo (event) {
            reload(event, this.$root, 'memo-table');
        },
        saveData (event) {
            save(event, this.$root, `/ctr-api/${window.contractId}/service/add`, this.save_service, 'service-table', (response) => this.save_service = deepCopy(emptyService));
        },
        editData (event) {
            edit(event, this.$root, `/srv-api/${this.edit_is.id}/edit`, this.edit_service, 'service-table', 'edit-modal');
        },
        deleteService(event) {
            remove(event, this.$root, `/ctr-api/${window.contractId}/service/${this.delete_service}/delete`, 'service-table', 'delete-service-modal');
        },
        deleteMemo(event) {
            remove(event, this.$root, `/ctr-api/${this.target_service}/service/${this.delete_memo}/memo/delete`, 'memo-table', 'delete-memo-modal');
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
        saveMemo(event) {
            save(event, this.$root, `/ctr-api/${this.contract_id}/service/${this.target_service}/memo/add`, this.save_memo, 'memo-table', (response) => this.save_memo = deepCopy(emptyMemo));
        },
        provider (ctx) {
            this.toggleBusy(true);
            return provider(`${ctx.apiUrl}/${this.contract_id}/service/${ctx.currentPage}/${ctx.perPage}`,
                this.search_service,
                this.service_rows,
                () => this.toggleBusy(false));
        },
        memos (ctx) {
            this.toggleMemoBusy(true);
            return provider(`${ctx.apiUrl}/${this.target_service}/serviceMemos/${ctx.currentPage}/${ctx.perPage}`,
                {}, // to add search_memo
                this.service_rows,
                () => this.toggleMemoBusy(false));
        },
        toggleBusy(state = undefined) {
            if(state === undefined)
                this.isBusy = !this.isBusy;
            else
                this.isBusy = state;
        },
        toggleMemoBusy(state = undefined) {
            if(state === undefined)
                this.isMemoBusy = !this.isMemoBusy;
            else
                this.isMemoBusy = state;
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
        deleteServiceModal(id) {
            this.delete_service = id;
            this.$root.$emit('bv::show::modal', 'delete-service-modal');
        },
        deleteMemoModal(id) {
            this.delete_memo = id;
            this.$root.$emit('bv::show::modal', 'delete-memo-modal');
        },
        serviceModal(id) {
            this.save_contract_is = id;
            this.$root.$emit('bv::show::modal', 'add-service-modal');
        },
        monthName(id) {
            return monthName(id);
        },
        showMemos(id) {
            this.target_service = id;
            this.reloadMemo();
        }
    }
});