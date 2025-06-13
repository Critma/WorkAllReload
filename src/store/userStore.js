import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useUserStore = defineStore("userStore", () => {
    const ID = ref(null);
    const login = ref("");
    const name = ref("");
    const jwt = ref("");
    const jwtLastCheck = ref(null);
    const isAuthenticated = ref(false);
    const isLoading = ref(false);
    const isEmployer = ref(false);
    const isAdmin = ref(false);
    const status = ref("");
    const isFirst = ref(false);

    const asignUser = (user) => {
        ID.value = user.id;
        login.value = user.login;
        jwt.value = user.jwt;
        name.value = user.name
        isAuthenticated.value = true
        isEmployer.value = user.isEmployer;
    }

    const clearUser = () => {
        ID.value = null;
        login.value = "";
        name.value = "";
        jwt.value = "";
        jwtLastCheck.value = null;
        isAuthenticated.value = false
        isLoading.value = false;
        isEmployer.value = false;
        isAdmin.value = false;
        status.value = "";
    }

    return {
        ID,
        login,
        isAuthenticated,
        jwt,
        isLoading,
        name,
        isEmployer,
        jwtLastCheck,
        isAdmin,
        status,
        isFirst,

        asignUser,
        clearUser
    }
});