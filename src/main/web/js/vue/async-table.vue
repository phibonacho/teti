<template>
    <b-table hover
             :items="provider"
             :fields="fields"
             :current-page="1"
             :per-page="10"
             :api-url="fetchPath"
             id="adm-table">
        <template v-slot:cell(id)="data">
            <div class="row justify-content-around">
                <a class="py-1 px-2 remove-administrator" @click="checkDelete(data.value)"><i class="fas fa-trash-alt text-ed"></i></a>
                <a class="py-1 px-2 edit-administrator" href="#" :data-id="data.value"><i class="fas fa-pen text-primary"></i></a>
                <a class="py-1 px-2" :href="'/registries/administrators/' + data.value + '/detail'"><i class="fas fa-portrait text-dark"></i></a>
            </div>
        </template>
        <template v-slot:table-busy>
            <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>
        </template>
            <template v-slot:overlay>
                <b-overlay :show="processing.status" no-wrap>
                    <template>
                        <div class="text-center text-primary my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Eseguo ...</strong>
                        </div>
                    </template>
                    <div
                            v-if="processing.status"
                            ref="dialog"
                            tabindex="-1"
                            role="dialog"
                            aria-modal="false"
                            aria-labelledby="form-confirm-label"
                            class="text-center p-3">
                        <p><strong id="form-confirm-label">{{ processing.prompt }}</strong></p>
                        <div class="d-flex">
                            <b-button variant="outline-danger" class="mr-3" @click="dismiss">
                                Cancel
                            </b-button>
                            <b-button variant="outline-success" @click="execute">OK</b-button>
                        </div>
                    </div>
                </b-overlay>
            </template>
    </b-table>
</template>

<script>
    import Vue from 'vue';
    import {TablePlugin, SpinnerPlugin, OverlayPlugin} from 'bootstrap-vue';
    import axios from "axios";

    Vue.use(TablePlugin);
    Vue.use(SpinnerPlugin);
    Vue.use(OverlayPlugin);

    export default {
        name: "async-table",
        props : {
            fetchPath : {
                type : String,
                required : true
            }
        },
        data() {
            return {
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
                processing : {
                    status : false,
                    prompt : '',
                    target : undefined
                },
                items : [],
            }
        },
        methods : {
            provider (ctx) {
                let promise = axios.post( `${ctx.apiUrl}/${ctx.currentPage}/${ctx.perPage}`, this.$parent.search);
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
            checkDelete(id) {
                console.log(`trying to delete ${id}!`);
                this.processing.prompt=`Sei sicuro di voler eliminare l\'amministratore ${id}?`;
                this.processing.target=id;
                this.processing.status=true;
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
        },
    }
</script>