import { useUserStore } from "@/store/userStore";
import { useServerStore } from "@/store/serverStore";
import axios from "axios";


async function login(email, password) {
    var result = {};
    result = await loginCandidate(email, password);
    if (!result.success) {
        result = await loginEmployer(email, password);
    }
    return result;
}

async function loginCandidate(email, password) {
    const userStore = useUserStore()
    const serverStore = useServerStore()

    userStore.isLoading = true;
    const url = `${serverStore.candidateURL}/auth`
    const userData = {
        email: email,
        password: password
    }
    let result = {
        success: false,
        error: "",
        obj: "",
    };

    try {
        const response = (await axios.get(url, { params: userData }))
        // console.log(response)
        const data = response.data
        const user = {
            jwt: data.token,
            login: data.candidate_Info.Email,
            id: data.candidate_Info.ID,
            name: data.candidate_Info.Name,
            isEmployer: false
        }
        localStorage.setItem('user', JSON.stringify(user));
        userStore.asignUser(user);
        result = {
            ...result,
            success: true,
            obj: response
        }
    }
    catch (error) {
        console.log(error)
        result = {
            ...result,
            success: false,
            error: error.response.data.info,
            obj: ""
        }
    }
    finally {
        userStore.isLoading = false
    }
    return result
}

async function loginEmployer(email, password) {
        const userStore = useUserStore()
    const serverStore = useServerStore()

    userStore.isLoading = true;
    const url = `${serverStore.empURL}/auth`
    const userData = {
        email: email,
        password: password
    }
    let result = {
        success: false,
        error: "",
        obj: "",
    };

    try {
        const response = (await axios.get(url, { params: userData }))
        console.log(response)
        const data = response.data
        const user = {
            jwt: data.token,
            login: data.Employee_Info.Email,
            id: data.Employee_Info.ID,
            name: data.Employee_Info.NameOrganization,
            isEmployer: true
        }
        localStorage.setItem('user', JSON.stringify(user));
        userStore.asignUser(user);
        result = {
            ...result,
            success: true,
            obj: response
        }
    }
    catch (error) {
        console.log(error)
        result = {
            ...result,
            success: false,
            error: error.response.data.info,
            obj: ""
        }
    }
    finally {
        userStore.isLoading = false
    }
    return result
}

async function logout() {
    const userStore = useUserStore()

    localStorage.removeItem('user');
    localStorage.removeItem('accountSection');
    userStore.clearUser();
}

async function checkJWT() {
    const userStore = useUserStore()
    //TODO: add JWT checking from server
    const retrievedUser = localStorage.getItem('user');
    if (retrievedUser) {
        const user = JSON.parse(retrievedUser);
        userStore.asignUser(user);
        console.log('JWT is valid');
    } else {
        console.log('JWT is invalid');
    }

}

export { login, logout, checkJWT }