import { createRouter, createWebHistory } from "vue-router";
import paths from "./paths";
import names from "./names";
import { useUserStore } from "@/store/userStore.js";
import { OnFirstRun } from '@/service/accessingService';
import statuses from "../helpers/statuses";
// pages
import Vacancies from "@/pages/VacanciesPage.vue";
import AuthPage from "@/pages/AuthPage.vue";
import Reg from "@/pages/RegisterPage.vue";
import ForgetPasswordPage from "@/pages/ForgetPasswordPage.vue";
import VacancyPage from "@/pages/VacancyPage.vue";
import AccountPage from "@/pages/Account/AccountPage.vue";
import Responses from "@/pages/ResponsesPage.vue";
import NotFound from "@/pages/NotFoundPage.vue";
import CompanyVacancies from "@/pages/CompanyVacancies.vue";
import CreateVacancy from "../pages/CreateVacancy.vue";
import VacancyResponses from "../pages/VacancyResponses.vue";
import ForbiddenPage from "@/pages/ForbiddenPage.vue";
import AdminPage from "@/pages/AdminPage.vue";


const routes = [
    { path: paths.Home, component: Vacancies, name: names.Home },
    { path: paths.Vacancies, component: Vacancies },
    { path: paths.Vacancy, component: VacancyPage, name: names.Vacancy, props: true },
    { path: paths.CompanyVacancies, component: CompanyVacancies },
    { path: paths.CreateVacancy, component: CreateVacancy },
    { path: paths.EditVacancy, component: CreateVacancy, name: names.EditVacancy },
    { path: paths.VacancyResponses, component: VacancyResponses },

    { path: paths.Auth, component: AuthPage, meta: { authExit: true } },
    { path: paths.Reg, component: Reg, meta: { authExit: true } },
    { path: paths.RegOrg, component: Reg, meta: { authExit: true } },
    {
        path: paths.Admin, component: AdminPage, beforeEnter: (to, from) => {
            if (isAdmin()) {
                return true;
            } else {
                return { name: names.Forbidden, params: { status: statuses.accessForbbiden } };
            }
        }
    },
    { path: paths.ForgetPassword, component: ForgetPasswordPage, meta: { authExit: true } },

    { path: paths.Account, component: AccountPage, name: names.Account, meta: { requiresAuth: true } },
    { path: paths.Responses, component: Responses, name: names.Responses, meta: { requiresAuth: true } },

    { path: paths.Forbidden, component: ForbiddenPage, name: names.Forbidden },
    { path: '/:pathMatch(.*)*', name: names.NotFound, component: NotFound },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


// TODO: guard
router.beforeEach(async (to) => {
    const userStore = useUserStore();

    // when website is opened
    if (userStore.isFirst == false) {
        await OnFirstRun()
    }

    if (isBanned() && !IsBanAllowedDests(to.name)) {
        return { name: names.Forbidden, params: { status: statuses.ban } };
    }

    if (to.meta.requiresAuth) {
        if (!userStore.isAuthenticated) {
            return { path: paths.Auth }
        } else {
            return;
        }
    } else if (userStore.isAuthenticated && to.meta.authExit) {
        console.log("authExit")
        return { name: names.Account }
    }
    return
})



function isAdmin() {
    const userStore = useUserStore();
    return userStore.isAdmin;
}

function isBanned() {
    const userStore = useUserStore();
    return userStore.status.includes(statuses.blocked);
}

function IsBanAllowedDests(name) {
    return name == names.Forbidden || name == names.NotFound || name == names.Account || name == names.Home;
}

export default router;