import { ref } from 'vue';

export default function useApi() {
    const isLoading = ref(false);
    const errorMessage = ref("");
    const successMesage = ref("");

    async function ExecuteApiCommand(command, onSuccess, onError) {
        isLoading.value = true;
        const result = await command();
        if (result.success) {
            onSuccess(result);
        } else {
            onError(result);
        }
        isLoading.value = false;
    }

    return { isLoading, errorMessage, successMesage, ExecuteApiCommand };
}