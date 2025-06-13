import { useUserStore } from "@/store/userStore";
import { useServerStore } from "@/store/serverStore";
import axios from "axios";
import Result from "../models/Result";
import Vacancy from "../models/Vacancy";
import CandidateResponse from "../models/CandidateResponse";
import Status from "../models/Status";
import Experience from "../models/Experience";
import { jwtHeader } from "@/helpers/serviceHelper.js";
import User from "../models/User";

async function isValidJwt(jwt) {
    const serverStore = useServerStore();
    const url = `${serverStore.adminURL}/token`;
    const queryData = {
        Token: jwt
    }
    try {
        const result = await axios.get(url, { params: queryData });
        return new Result(true, result.data.Info, null);
    }
    catch (error) {
        console.log('check jwt error')
        console.log(error)
        return new Result(false, error.response.data.Info, error);
    }
}

async function getStatuses() {
    const serverStore = useServerStore();
    const url = serverStore.statusURL;
    try {
        const result = await axios.get(url);
        const statusList = result.data.Data.map(status => {
            return new Status(status.ID, status.Name, status.CreatedAt)
        })
        return new Result(true, '', statusList);
    }
    catch (error) {
        console.log('getStatuses error')
        console.log(error)
        return new Result(true, error.response.data.Error, null);
    }
}


async function getAllEmployers() {
    const serverStore = useServerStore();
    const url = `${serverStore.adminURL}/emp`;
    try {
        const result = await axios.get(url, jwtHeader());
        const employerList = result.data.EmployersInfo.map(emp => {
            return new User(emp.ID, emp.NameOrganization, emp.PhoneNumber, emp.Email, null, emp.Status.ID, emp.CreatedAt, emp.UpdatedAt, emp.INN, new Status(emp.Status.ID, emp.Status.Name, emp.Status.CreatedAt));
        });
        return new Result(true, '', employerList);
    }
    catch (error) {
        console.log(error);
        return new Result(false, error.response.data.Info, []);
    }

}

async function setEmployerStatus(EmployerID, StatusID) {
    const serverStore = useServerStore();
    const url = `${serverStore.adminURL}/emp`;
    const queryData = {
        EmployerID: EmployerID,
        StatusID: StatusID
    }
    try {
        const result = await axios.patch(url, null, { params: queryData, ...jwtHeader() });
        return new Result(true, '', result.data);
    }
    catch (error) {
        console.log(error);
        return new Result(false, error.response.data.Info, null);
    }
}

export { isValidJwt, getStatuses, getAllEmployers, setEmployerStatus }