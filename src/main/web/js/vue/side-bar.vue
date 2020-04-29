<script>
    import "../../scss/components/_sidebar.scss";
    import Vue from 'vue';
    import {CollapsePlugin, SidebarPlugin} from 'bootstrap-vue';

    Vue.use(CollapsePlugin);
    Vue.use(SidebarPlugin);

    export default {
        name : 'side-bar'
    }
</script>