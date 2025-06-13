import { useUserStore } from "@/store/userStore";
import { useServerStore } from "@/store/serverStore";
import axios from "axios";
import Result from "../models/Result";
import { isValidJwt } from "./adminService";
import router from "../router/router";
import { getCandidateSelf } from "./candidateService";
import { getEmployerSelf } from "./employerService";
import statuses from "../helpers/statuses";


async function login(email, password) {
    const userStore = useUserStore();
    const serverStore = useServerStore();

    const url = `${serverStore.auth}`
    const userData = {
        Email: email,
        Password: password
    }
    try {
        const response = (await axios.get(url, { params: userData }))
        const data = response.data
        let user;
        if ('CandidateInfo' in data) {
            user = await ParseCandidate(data)
        } else {
            user = await ParseEmployer(data)
        }
        localStorage.setItem('user', JSON.stringify(user));
        userStore.asignUser(user);
        await fetchRoleStatus();
        return new Result(true, "", user);
    }
    catch (error) {
        console.log(error)
        return new Result(false, error.response.data.Error, error);
    }
    finally {
        userStore.isLoading = false
    }
}

async function ParseCandidate(data) {
    return {
        jwt: data.Token,
        login: data.CandidateInfo.Email,
        id: data.CandidateInfo.ID,
        name: data.CandidateInfo.Name,
        isEmployer: false
    }
}

async function ParseEmployer(data) {
    return {
        jwt: data.Token,
        login: data.EmployerInfo.Email,
        id: data.EmployerInfo.ID,
        name: data.EmployerInfo.NameOrganization,
        isEmployer: true
    }
}

async function logout() {
    const userStore = useUserStore()
    localStorage.removeItem('user');
    localStorage.removeItem('accountSection');
    userStore.clearUser();

    router.push({ path: '/' });
}

async function OnFirstRun() {
    const userStore = useUserStore();
    userStore.isFirst = true;
    userStore.isLoading = true;
    const retrievedUser = localStorage.getItem('user');
    if (retrievedUser) {
        console.log('Saved session found');
        const user = JSON.parse(retrievedUser);
        if (await isJwtValid(user.jwt)) {
            userStore.asignUser(user);
            await fetchRoleStatus();
            return true;
        } else {
            await logout();
        }
    } else {
        console.log('Saved session not found');
    }
    userStore.isLoading = false;
    return false;
}

async function isJwtValid(jwt) {
    const userStore = useUserStore();
    console.log('checking jwt...');
    userStore.jwtLastCheck = new Date().getTime();
    const result = await isValidJwt(jwt);
    if (!result.success) {
        console.log('JWT expired')
        alert('Срок действия вашей сессии истек')
        return false
    }
    return true
}

async function fetchRoleStatus() {
    const userStore = useUserStore();
    let result;
    if (userStore.isEmployer) {
        result = await getEmployerSelf();
    }
    else {
        result = await getCandidateSelf();
    }
    if (result.success) {
        const status = result.data.status.name.toLowerCase();
        if (status.includes(statuses.admin)) {
            userStore.isAdmin = true;
        }
        userStore.status = status;
    }
}

export { login, logout, OnFirstRun, isJwtValid, fetchRoleStatus }