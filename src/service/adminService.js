import { useUserStore } from "@/store/userStore";
import { useServerStore } from "@/store/serverStore";
import axios from "axios";
import Result from "../models/Result";
import Vacancy from "../models/Vacancy";
import CandidateResponse from "../models/CandidateResponse";
import Status from "../models/Status";
import Experience from "../models/Experience";
import { jwtHeader } from "@/helpers/serviceHelper.js";

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

export { isValidJwt, getStatuses }