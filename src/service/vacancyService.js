import { useUserStore } from "@/store/userStore";
import { useServerStore } from "@/store/serverStore";
import axios from "axios";
import Result from "../models/Result";
import Vacancy from "../models/Vacancy";
import { jwtHeader } from "../helpers/serviceHelper";

// const userStore = useUserStore()


// return new Vacancy[]
function toVacancy(vacansies) {
    if (vacansies == null) {
        return [];
    }
    return vacansies.map(vacancy => {
        return new Vacancy(
            vacancy.ID,
            vacancy.Name,
            vacancy.Price,
            vacancy.Email,
            vacancy.PhoneNumber,
            vacancy.Location,
            vacancy.ExperienceInfo.ID,
            vacancy.AboutWork,
            vacancy.IsVisible,
            vacancy.EmployerInfo.ID,
            vacancy.CreatedAt,
            vacancy.UpdatedAt
        );
    });
}

// return vacacy[]
async function getVacansies(limit, lastId) {
    const serverStore = useServerStore()

    const queryData = {
        limit: limit,
        last_id: lastId,
    }

    let result = {};
    let response = {};
    try {
        response = await axios.get(`${serverStore.vacancyURL}`, { params: queryData })
    } catch (error) {
        console.log(`Error : ${error}`)
        result = new Result(false, error.response.data.Info, "Ошибка получения вакансий")
    }
    const data = toVacancy(response.data.VacancyInfo)
    result = new Result(true, "", data)
    return result;
}

async function getVacansiesFromSelfEmployer() {
    const serverStore = useServerStore()

    let result = {};
    let response = {};
    try {
        response = await axios.get(`${serverStore.vacancyURL}/emp`, jwtHeader())
    } catch (error) {
        console.log(`Error : ${error}`)
        result = new Result(false, error.response.data.Info, "Ошибка получения вакансий")
    }
    console.log(response)
    const data = response.data.VacancyInfo.map(vacancy => {
        return new Vacancy(
            vacancy.ID,
            vacancy.Name,
            vacancy.Price,
            vacancy.Email,
            vacancy.PhoneNumber,
            vacancy.Location,
            vacancy.Experience.ID,
            vacancy.AboutWork,
            vacancy.IsVisible,
            response.data.EmployerID,
            vacancy.CreatedAt,
            vacancy.UpdatedAt
        );
    })
    result = new Result(true, "", data)
    return result;
}

export { getVacansies, getVacansiesFromSelfEmployer };