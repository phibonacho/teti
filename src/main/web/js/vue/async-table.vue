<template>
    <b-table striped hover
             :items="provider"
             :fields="fields"
             :current-page="1"
             :per-page="20"
             :api-url="fetchPath"
             id="adm-table">
        <template v-slot:table-busy>
            <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>
        </template>
    </b-table>
</template>

<script>
    import Vue from 'vue';
    import {TablePlugin, SpinnerPlugin} from 'bootstrap-vue';
    import axios from "axios";

    Vue.use(TablePlugin);
    Vue.use(SpinnerPlugin);

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
                    }
                ],
                isBusy: true,
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
            }
        },
    }
</script>

<style scoped>

</style>