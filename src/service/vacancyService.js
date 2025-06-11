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
async function getVacansies(page, perPage) {
    const serverStore = useServerStore()
    const queryData = {
        Page: page,
        PerPage: perPage,
    }
    let result = {};
    let response = {};
    try {
        response = await axios.get(`${serverStore.vacancyURL}`, { params: queryData })
    } catch (error) {
        console.log(`Error : ${error}`)
        result = new Result(false, error.response.data.Info, "Ошибка получения вакансий")
    }
    // console.log(response);
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
    const data = response.data.VacanciesInfo.map(vacancy => {
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

// vacancy : Vacancy
async function addVacancy(vacancy) {
    const serverStore = useServerStore()
    const url = serverStore.vacancyURL;
    const body = {
        About: vacancy.aboutWork,
        Email: vacancy.email,
        ExperienceID: vacancy.experience_id,
        IsVisible: vacancy.visible,
        Location: vacancy.location,
        PhoneNumber: vacancy.phoneNumber,
        Price: vacancy.salary,
        VacancyName: vacancy.name,
    }
    // console.log(body)
    let response = {};
    try {
        response = await axios.post(url, body, jwtHeader());
    }
    catch (error) {
        console.log('add vacancy error ' + error)
        return new Result(false, error.response.data.Error, error);
    }
    const data = response.data.EmployerInfo;
    return new Result(true, "", data);
}

async function getVacancyInfo(id) {
    const serverStore = useServerStore()
    let result = {};
    let response = {};
    const queryData = {
        VacancyID: id,
    }
    try {
        response = await axios.get(`${serverStore.vacancyURL}/info`, { params: queryData });
    } catch (error) {
        console.log(error)
        return result = new Result(false, error.response.data.Info, "Ошибка получения информации о вакансии")
    }
    const data = response.data.VacancyInfo;
    try {
        const vacancy = new Vacancy(data.ID, data.Name, data.Price, data.Email, data.PhoneNumber,
            data.Location, data.ExperienceInfo.ID, data.AboutWork, data.IsVisible, data.EmployerInfo.ID, data.CreatedAt,
            data.UpdatedAt, data.ExperienceInfo, data.EmployerInfo.NameOrganization, data.EmployerInfo);
        result = new Result(true, "", vacancy)
    }
    catch (error) {
        console.log(`Error : ${error}`)
        result = new Result(false, error, "Ошибка парсинга полученных данных")
    }

    return result;
}

async function updateVacancy(vacancy) {
    const serverStore = useServerStore()
    const url = serverStore.vacancyURL;
    const body = {
        ID: vacancy.id,
        About: vacancy.aboutWork,
        Email: vacancy.email,
        ExperienceID: vacancy.experience_id,
        IsVisible: vacancy.visible,
        Location: vacancy.location,
        PhoneNumber: vacancy.phoneNumber,
        Price: vacancy.salary,
        VacancyName: vacancy.name,
    }
    // console.log(body)
    let response = {};
    try {
        response = await axios.put(url, body, jwtHeader());
    }
    catch (error) {
        console.log(error.response.data)
        return new Result(false, error.response.data.Error, error);
    }
    const data = response.data;
    return new Result(true, "", data);
}

async function deleteVacancy(id) {
    const serverStore = useServerStore()
    const url = serverStore.vacancyURL;
    const queryData = {
        VacancyID: id,
    }
    let result = {};
    try {
        await axios.delete(url, { params: queryData, ...jwtHeader() },)
        result = new Result(true, "", "")
    }
    catch (error) {
        console.log(error.response)
        result = new Result(false, "", error)
    }
    return result;
}

async function toggleVisibilityVacancy(vacancy) {
    const serverStore = useServerStore()
    const url = serverStore.vacancyURL;
    const body = {
        ID: vacancy.id,
        About: vacancy.aboutWork,
        Email: vacancy.email,
        ExperienceID: vacancy.experience_id,
        IsVisible: !vacancy.visible,
        Location: vacancy.location,
        PhoneNumber: vacancy.phoneNumber,
        Price: vacancy.salary,
        VacancyName: vacancy.name,
    }
    // console.log(body)
    let response = {};
    try {
        response = await axios.put(url, body, jwtHeader());
    }
    catch (error) {
        console.log(error.response.data)
        return new Result(false, error.response.data.Error, error);
    }
    const data = response.data;
    return new Result(true, "", data);
}

async function getVacansiesCount() {
    const serverStore = useServerStore()
    const url = `${serverStore.vacancyURL}/num`;
    try {
        const result = await axios.get(url)
        return new Result(true, "", result.data.Quantity)
    }
    catch (error) {
        console.log(error);
        return new Result(false, error.response.data.Error, error);
    }
}

export { getVacansies, getVacansiesFromSelfEmployer, addVacancy, getVacancyInfo, updateVacancy, deleteVacancy, toggleVisibilityVacancy, getVacansiesCount };