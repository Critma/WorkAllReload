import { useUserStore } from "@/store/userStore";
import { useServerStore } from "@/store/serverStore";
import axios from "axios";
import Result from "../models/Result";


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
        console.log(data)
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