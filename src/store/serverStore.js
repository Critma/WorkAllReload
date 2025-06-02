import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useServerStore = defineStore("serverStore", () => {
    const baseURL = "http://217.114.15.72:8089/api/v1/"
    const empURL = baseURL + 'emp';
    const candidateURL = baseURL + 'user';
    
    return{
        empURL,
        candidateURL
    }
});