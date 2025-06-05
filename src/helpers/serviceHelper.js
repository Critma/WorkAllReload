import { useUserStore } from "@/store/userStore.js";

const jwtHeader = () => {
    const store = useUserStore();
    return {
        headers: { Authorization: `Bearer ${store.jwt}` }
    }
};


export { jwtHeader };