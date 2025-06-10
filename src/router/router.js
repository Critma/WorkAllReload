import { createRouter, createWebHistory } from "vue-router";
import paths from "./paths";
import names from "./names";
import { useUserStore } from "@/store/userStore.js";
import { checkJWT } from '@/service/accessingService';
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

const routes = [
    { path: paths.Home, component: Vacancies },
    { path: paths.Vacancies, component: Vacancies },
    { path: paths.Vacancy, component: VacancyPage, name: names.Vacancy, props: true },
    { path: paths.CompanyVacancies, component: CompanyVacancies },
    { path: paths.CreateVacancy, component: CreateVacancy }, { path: paths.EditVacancy, component: CreateVacancy, name: names.EditVacancy },
    { path: paths.VacancyResponses, component: VacancyResponses },

    { path: paths.Auth, component: AuthPage, meta: { authExit: true } },
    { path: paths.Reg, component: Reg, meta: { authExit: true } },
    { path: paths.RegOrg, component: Reg, meta: { authExit: true } },
    { path: paths.ForgetPassword, component: ForgetPasswordPage, meta: { authExit: true } },

    { path: paths.Account, component: AccountPage, name: names.Account, meta: { requiresAuth: true } },
    { path: paths.Responses, component: Responses, name: names.Responses, meta: { requiresAuth: true } },

    { path: '/:pathMatch(.*)*', name: names.NotFound, component: NotFound }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to) => {
    const userStore = useUserStore();
    if (userStore.jwtLastCheck == null) {
        await checkJWT();
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

export default router;