import { useUserStore } from "@/store/userStore.js";

const jwtHeader = (token = null) => {
    const store = useUserStore();
    if (token === null) {
        return {
            headers: { Authorization: `Bearer ${store.jwt}` }
        }
    } else {
        return {
            headers: { Authorization: `Bearer ${token}` }
        }
    }
};


export { jwtHeader };