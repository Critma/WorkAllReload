import { useUserStore } from "@/store/userStore";
import { useServerStore } from "@/store/serverStore";
import axios from "axios";
import Result from "../models/Result";
import Vacancy from "../models/Vacancy";
import User from "../models/User";
import { jwtHeader } from "@/helpers/serviceHelper.js";


async function getEmployerInfo(employerID) {
    const serverStore = useServerStore()
    try {
        const url = serverStore.employerURL;
        const params = { ...jwtHeader(), params: { employerID: employerID } };
        const response = await axios.get(url, params);
        const info = response.data.EmployerInfo;
        const candidate = new User(info.ID, info.NameOrganization, info.PhoneNumber, info.Email, null, info.Status.ID, info.CreatedAt, info.UpdatedAt, info.INN);
        return new Result(true, "", candidate);
    }
    catch (error) {
        console.log(error);
        return new Result(false, error.response.data.Info, error);
    }
}

async function getEmployerSelf() {
    return await getEmployerInfo(useUserStore().ID)
}


async function saveEmployer(user) {
    const serverStore = useServerStore()
    const url = serverStore.empURL;
    let response;
    const body = {
        Email: user.email,
        INN: user.INN,
        NameOrganization: user.name,
        PhoneNumber: user.phone,
        StatusID: user.statusId,
    }
    try {
        response = await axios.put(url, body, jwtHeader());
    }
    catch (error) {
        console.log(error)
        return new Result(false, error.response.data.Info, error);
    }
    const data = response.data;
    return new Result(true, "", data);
};


export { getEmployerInfo, getEmployerSelf, saveEmployer };