import { useUserStore } from "@/store/userStore";
import { useServerStore } from "@/store/serverStore";
import axios from "axios";
import Result from "../models/Result";
import Vacancy from "../models/Vacancy";
import User from "../models/User";
import { jwtHeader } from "../helpers/serviceHelper";
import CandidateResponse from "@/models/CandidateResponse";
import Status from "@/models/Status";
import Experience from "@/models/Experience";


async function getCandidateInfo(candidateID) {
    const serverStore = useServerStore()
    try {
        const url = serverStore.candidateURL;
        const params = { ...jwtHeader(), params: { CandidateID: candidateID } };
        const response = await axios.get(url, params);
        const info = response.data.CandidateInfo;
        const candidate = new User(info.ID, info.Name, info.PhoneNumber, info.Email, null, info.StatusInfo.ID, info.CreatedAt, info.UpdatedAt, null,
            new Status(info.StatusInfo.ID, info.StatusInfo.Name, info.StatusInfo.CreatedAt));
        return new Result(true, "", candidate);
    }
    catch (error) {
        console.log(error)
        return new Result(false, error.response.data.Info, error);
    }
}

async function getCandidateSelf() {
    return await getCandidateInfo(useUserStore().ID)
}

async function saveCandidate(user) {
    const serverStore = useServerStore()
    const url = serverStore.candidateURL;
    const body = {
        Email: user.email,
        Name: user.name,
        PhoneNumber: user.phone,
        StatusId: user.statusId,
        Password: ""
    }
    let response = {};
    try {
        response = await axios.put(url, body, jwtHeader());
    }
    catch (error) {
        console.log(error)
        return new Result(false, error.response.data.Error, error);
    }
    const data = response.data;
    return new Result(true, "", data);
};

async function registerCandidate(user) {
    const serverStore = useServerStore()
    const url = serverStore.candidateURL;
    const body = {
        Email: user.Email,
        Name: user.Name,
        Password: user.Password,
        PhoneNumber: user.PhoneNumber,
        StatusId: 3,
    }
    let response = {};
    try {
        response = await axios.post(url, body, jwtHeader());
    }
    catch (error) {
        console.log('register candidate error' + error)
        return new Result(false, error.response.data.Error, error);
    }
    const data = response.data;
    return new Result(true, "", data);
}

export { getCandidateInfo, getCandidateSelf, saveCandidate, registerCandidate }