import { defineStore } from "pinia";

export const useServerStore = defineStore("serverStore", () => {
    const baseURL = "https://isp-workall.online/api/v1/"
    const empURL = baseURL + 'emp';
    const candidateURL = baseURL + 'user';
    const employerURL = baseURL + 'emp';
    const vacancyURL = baseURL + 'vac';
    const adminURL = baseURL + 'adm';
    const experienceURL = baseURL + 'exp';
    const resumeURL = `${candidateURL}/resume`;
    const statusURL = baseURL + 'status';

    return {
        empURL,
        candidateURL,
        vacancyURL,
        employerURL,
        adminURL,
        experienceURL,
        resumeURL,
        statusURL
    }
});