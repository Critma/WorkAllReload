import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useServerStore = defineStore("serverStore", () => {
    const baseURL = "https://isp-workall.online/api/v1/"
    const empURL = baseURL + 'emp';
    const candidateURL = baseURL + 'user';
    const employerURL = baseURL + 'emp';
    const vacancyURL = baseURL + 'vac';

    return {
        empURL,
        candidateURL,
        vacancyURL,
        employerURL
    }
});