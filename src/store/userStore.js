import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useUserStore = defineStore("userStore", () => {
    const id = ref(null);
    const login = ref("");
    const isAuthenticated = ref(false);
    const jwt = ref("");

    
    return{
        id,
        login,
        isAuthenticated,
        jwt
    }
});