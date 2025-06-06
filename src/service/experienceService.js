import { useUserStore } from "@/store/userStore";
import { useServerStore } from "@/store/serverStore";
import axios from "axios";
import Result from "../models/Result";
import Experience from "@/models/Experience";
import { jwtHeader } from "../helpers/serviceHelper";

async function GetExperiences() {
    const serverStore = useServerStore()
    let result = {};
    let response = {};
    try {
        response = await axios.get(serverStore.experienceURL, jwtHeader());
    } catch (error) {
        console.log(`Error : ${error}`)
        result = new Result(false, error.response.data.Info, "Ошибка получения списка опыта")
    }
    const data = response.data.Data.map(item => new Experience(item.ID, item.Name, item.CreatedAt));
    result = new Result(true, "", data)
    return result;
}

export { GetExperiences }