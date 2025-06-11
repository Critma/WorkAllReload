import { useUserStore } from "@/store/userStore";
import { useServerStore } from "@/store/serverStore";
import axios from "axios";
import Result from "../models/Result";
import Vacancy from "../models/Vacancy";
import CandidateResponse from "../models/CandidateResponse";
import Status from "../models/Status";
import { jwtHeader } from "@/helpers/serviceHelper.js";
import Experience from "../models/Experience";
import VacancyResponse from "../models/VacancyResponse";
import User from "../models/User";

async function sendResponse(vacansId) {
    const serverStore = useServerStore();
    const url = `${serverStore.vacancyURL}/response`;
    const config = {
        params: {
            VacancyID: vacansId
        },
        ...jwtHeader()
    }
    try {
        const result = await axios.post(url, null, config);
        return new Result(true, "", null);
    }
    catch (error) {
        console.log(error);
        return new Result(false, error.response.data.Error, error);
    }
}

async function deleteResponse(vacansId) {
    const serverStore = useServerStore();
    const url = `${serverStore.vacancyURL}/response`;
    const config = {
        params: {
            VacancyID: vacansId
        },
        ...jwtHeader()
    }
    try {
        const result = await axios.delete(url, config);
        return new Result(true, "", null);
    }
    catch (error) {
        console.log(error);
        return new Result(false, error.response.data.Error, error);
    }
}

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

async function isResponseOnVacancy(vacansId) {
    const result = await getCandidateResponses();
    if (!result.success) return result;
    const responses = result.data;
    for (let i = 0; i < responses.length; i++) {
        if (responses[i].vakans_id == vacansId) return new Result(true, "", true);
    }
    return new Result(true, "", false);
}

// return VacancyResponse[]
async function getResponsesOnVacancy(vacancyId) {
    const serverStore = useServerStore();
    const url = `${serverStore.vacancyURL}/response`;
    const queryData = {
        VacancyID: vacancyId,
    }
    try {
        const response = await axios.get(url, { params: queryData, ...jwtHeader() });
        const data = response.data;
        const responses = data.Responses;
        const vacancy = data.VacancyInfo;
        if (responses === null) return new Result(true, "", []);
        const vacancyResponses = responses.map(response => {
            return new VacancyResponse(
                response.ID,
                response.CreatedAt,
                new Status(response.Status.ID, response.Status.Name, response.Status.CreatedAt),
                new User(response.CandidateInfo.ID, response.CandidateInfo.Name, response.CandidateInfo.PhoneNumber, response.CandidateInfo.Email),
                new Vacancy(vacancy.ID, vacancy.Name, vacancy.Price, vacancy.Email,
                    vacancy.PhoneNumber, vacancy.Location,
                    vacancy.Experience.ID, vacancy.AboutWork,
                    vacancy.IsVisible, null, vacancy.CreatedAt, vacancy.UpdatedAt, new Experience(vacancy.Experience.ID, vacancy.Experience.Name, vacancy.Experience.CreatedAt), null, null)
            );
        });
        return new Result(true, "", vacancyResponses);
    }
    catch (error) {
        console.log(error)
        return new Result(false, error.response.data.Info, error);
    }
}

async function changeResponseStatus(responseId, statusId) {
    const serverStore = useServerStore();
    const url = `${serverStore.vacancyURL}/response`;
    const body = {
        ResponseID: responseId,
        StatusID: statusId
    }
    try {
        const result = await axios.patch(url, body, jwtHeader());
        return new Result(true, "", null);
    }
    catch (error) {
        console.log(error)
        return new Result(false, error.response.data.Info, error);
    }
}

export { getCandidateResponses, sendResponse, deleteResponse, isResponseOnVacancy, getResponsesOnVacancy, changeResponseStatus };