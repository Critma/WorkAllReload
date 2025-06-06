import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useServerStore = defineStore("serverStore", () => {
    const baseURL = "https://isp-workall.online/api/v1/"
    const empURL = baseURL + 'emp';
    const candidateURL = baseURL + 'user';
    const employerURL = baseURL + 'emp';
    const vacancyURL = baseURL + 'vac';
    const adminURL = baseURL + 'adm';
    const experienceURL = baseURL + 'exp';

    return {
        empURL,
        candidateURL,
        vacancyURL,
        employerURL,
        adminURL,
        experienceURL
    }
});