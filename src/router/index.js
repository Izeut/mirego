import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import notConnectedPage from "../views/notConnected";
import momentListPage from '../views/momentsList';
import momentsWithStatus from "../views/momentsWithStatus";

export default new Router({
    routes: [
        {
            path: "/notConnected",
            name: "notConnected",
            component: notConnectedPage
        },
        {
            path: "/momentsList",
            name: "momentsList",
            component: momentListPage
        },
        {
            path: "/momentsWithStatus/:status",
            name: "momentsWithStatus",
            component: momentsWithStatus
        }
    ]
});