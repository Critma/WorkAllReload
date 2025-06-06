import { ref } from 'vue';

export default function usePageRefs() {
    const isLoading = ref(false);
    const errorMessage = ref("");
    const successMesage = ref("");

    return { isLoading, errorMessage, successMesage };
}