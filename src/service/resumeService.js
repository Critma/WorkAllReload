import { useUserStore } from "@/store/userStore";
import { useServerStore } from "@/store/serverStore";
import axios from "axios";
import Result from "../models/Result";
import Resume from "../models/Resume";
import { jwtHeader } from "../helpers/serviceHelper";
import Experience from "../models/Experience";

async function GetResume(candidateId) {
    const serverStore = useServerStore()
    const url = serverStore.resumeURL;
    const queryParams = {
        CandidateID: candidateId,
    }
    // console.log(body)
    let response = {};
    try {
        response = await axios.get(url, { params: queryParams, ...jwtHeader() });
    }
    catch (error) {
        console.log(error.response.data)
        return new Result(false, error.response.data.Error, error);
    }
    const data = response.data;
    let resume = new Resume();
    if (data.ResumesInfo != null && data.ResumesInfo.length > 0) {
        const first = data.ResumesInfo[0]
        resume = new Resume(first.ID,
            data.CandidateInfo.ID,
            first.ExperienceInfo.ID,
            first.Description,
            first.CreatedAt,
            first.UpdatedAt,
            new Experience(first.ExperienceInfo.ID, first.ExperienceInfo.Name, first.ExperienceInfo.CreatedAt)
        )
    }
    return new Result(true, "", resume);
}

async function AddOrUpdateResume(resume) {
    const serverStore = useServerStore()
    const url = serverStore.resumeURL;
    let response = {};
    try {
        const body = {
            Description: resume.description,
            ExperienceID: resume.experience_id,
        };
        if (resume.id == 0) {
            response = await axios.post(url, body, jwtHeader());
        }
        else {
            body.ResumeID = resume.id;
            response = await axios.put(url, body, jwtHeader());
        }
    }
    catch (error) {
        console.log(error.response.data)
        return new Result(false, error.response.data.Error, error);
    }
    return new Result(true, "", response.data);
}

export { GetResume, AddOrUpdateResume }