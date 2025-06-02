import { useUserStore } from "@/store/userStore";
import { useServerStore } from "@/store/serverStore";
import axios from "axios";


async function loginCandidate(email, password) {
    const userStore = useUserStore()
    const serverStore = useServerStore()

    const userData = {
        email: email,
        password: password
    }
    const url = `${serverStore.candidateURL}/auth`
    const response = await axios.get(url, userData)
    console.log(response)
    return response
}

export { loginCandidate }