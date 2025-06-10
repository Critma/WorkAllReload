import { useUserStore } from "@/store/userStore";
import { useServerStore } from "@/store/serverStore";
import axios from "axios";
import Result from "../models/Result";
import { isValidJwt } from "./adminService";
import router from "../router/router";


async function login(email, password) {
    var result = {};
    result = await loginCandidate(email, password);
    if (!result.success) {
        result = await loginEmployer(email, password);
    }
    // result.error = 'Неправильные данные для входа';
    return result;
}

async function loginCandidate(email, password) {
    const userStore = useUserStore()
    const serverStore = useServerStore()

    userStore.isLoading = true;
    const url = `${serverStore.candidateURL}/auth`
    const userData = {
        Email: email,
        Password: password
    }
    let result = {};
    try {
        const response = (await axios.get(url, { params: userData }))
        const data = response.data
        const user = {
            jwt: data.Token,
            login: data.CandidateInfo.Email,
            id: data.CandidateInfo.ID,
            name: data.CandidateInfo.Name,
            isEmployer: false
        }
        localStorage.setItem('user', JSON.stringify(user));
        userStore.asignUser(user);
        result = new Result(true, "", response);
    }
    catch (error) {
        console.log(error)
        result = new Result(false, error.response.data.Error, error);
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
        Email: email,
        Password: password
    }
    let result = {
        success: false,
        error: "",
        obj: "",
    };
    try {
        const response = (await axios.get(url, { params: userData }))
        const data = response.data
        const user = {
            jwt: data.Token,
            login: data.EmployerInfo.Email,
            id: data.EmployerInfo.ID,
            name: data.EmployerInfo.NameOrganization,
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
            error: error.response.data.Error,
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

    router.push('/');
}

async function checkJWT() {
    const userStore = useUserStore();
    userStore.jwtLastCheck = new Date().getTime();
    userStore.isLoading = true;
    const retrievedUser = localStorage.getItem('user');
    if (retrievedUser) {
        console.log('Saved session found');
        const user = JSON.parse(retrievedUser);
        console.log('Checking JWT');
        const result = await isValidJwt(user.jwt);
        if (!result.success) {
            await logout();
            console.log('JWT expired')
            alert('Срок действия вашей сессии истек')
        }
        else {
            userStore.asignUser(user);
        }
    } else {
        console.log('Saved session not found');
        await logout();
    }
    userStore.isLoading = false;
}

export { login, logout, checkJWT }