// SCSS
import "../scss/contract_detail.scss";

// JS
import "./components/fontawesome";
import "./components/navbar";
import "./components/sidebar";

// VUE
import {deepCopy, reload, save, remove, provider, baseData} from './components/utilities/dataUtils'
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

const months = [null,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(mon => ({
    value : mon,
    text : mon == null
        ? '---'
        : new Date(2020, mon).toLocaleString('it', {month: 'long'})
}));

const monthName = (id) => {
    if(id == null)
        return months[0];
    return months[++id].text;
};

new Vue({
    el : '#app',
    data : {
        contract_id : window.contractId,
        service : baseData("/ctr-api", emptyService, { target : undefined }),
        memo : baseData("ctr-api", emptyMemo),
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
        displayMemo : [],
        months : months
    },
    methods : {
        saveService (event) {
            save(event, this.$root, `/ctr-api/${this.contract_id}/service/add`, this.service.save, 'service-table', (response) => this.service.save = deepCopy(emptyService));
        },
        deleteService(event) {
            remove(event, this.$root, `/ctr-api/${this.contract_id}/service/${this.service.remove}/delete`, 'service-table', 'delete-service-modal');
        },
        deleteMemo(event) {
            remove(event, this.$root, `/ctr-api/${this.service.target}/service/${this.memo.remove}/memo/delete`, 'memo-table', 'delete-memo-modal');
        },
        saveMemo(event) {
            save(event, this.$root, `/ctr-api/${this.contract_id}/service/${this.service.target}/memo/add`, this.memo.save, 'memo-table', (response) => this.memo.save = deepCopy(emptyMemo));
        },
        services (ctx) {
            this.toggleServiceBusy(true);
            return provider(`${ctx.apiUrl}/${this.contract_id}/service/${ctx.currentPage}/${ctx.perPage}`,
                this.service.search,
                this.service.rows,
                () => this.toggleServiceBusy(false));
        },
        memos (ctx) {
            this.toggleMemoBusy(true);
            return provider(`${ctx.apiUrl}/${this.service.target}/serviceMemos/${ctx.currentPage}/${ctx.perPage}`,
                {}, // to add search_memo
                this.memo.rows,
                () => this.toggleMemoBusy(false));
        },
        toggleServiceBusy(state = undefined) {
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
        deleteServiceModal(id) {
            this.service.remove = id;
            this.$root.$emit('bv::show::modal', 'delete-service-modal');
        },
        deleteMemoModal(id) {
            this.memo.remove = id;
            this.$root.$emit('bv::show::modal', 'delete-memo-modal');
        },
        showMemos(id) {
            this.service.target = id;
            reload(undefined, this.$root, 'memo-table');
        },
        monthName(id) {
            return monthName(id);
        }
    }
});