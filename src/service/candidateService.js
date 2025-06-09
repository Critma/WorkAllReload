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
        const params = { ...jwtHeader(), params: { СandidateID : candidateID } };
        const response = await axios.get(url, params);
        const info = response.data.CandidateInfo;
        const candidate = new User(info.ID, info.Name, info.PhoneNumber, info.Email, null, info.StatusInfo.ID, info.CreatedAt, info.UpdatedAt);
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
    console.log(body)
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

async function getCandidateResponses() {
    const serverStore = useServerStore()
    const url = `${serverStore.candidateURL}/response`;
    let response = {};

    try {
        response = await axios.get(url, jwtHeader());
    }
    catch (error) {
        console.log(error)
        return new Result(false, error.response.data.Info, error);
    }
    const data = response.data.Responses;
    const responses = [];
    if (data === null) return responses;
    data.forEach(response => {
        const vacan = response.VacancyInfo;
        responses.push(new CandidateResponse(response.ID,
            new Vacancy(vacan.ID, vacan.Name, vacan.Price, vacan.Email, vacan.PhoneNumber, vacan.Location, vacan.ExperienceInfo.ID, vacan.AboutWork, vacan.IsVisible, null, vacan.CreatedAt, vacan.UpdatedAt, new Experience(vacan.ExperienceInfo.ID, vacan.ExperienceInfo.Name, vacan.ExperienceInfo.CreatedAt), vacan.EmployerName),
            new Status(response.StatusInfo.ID, response.StatusInfo.Name, response.StatusInfo.CreatedAt),
            vacan.ID,
            response.StatusInfo.ID))
    });
    return new Result(true, "", responses);
}

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

export { getCandidateInfo, getCandidateSelf, saveCandidate, getCandidateResponses, registerCandidate }