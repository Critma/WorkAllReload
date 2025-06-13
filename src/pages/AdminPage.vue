<template>
    <div class="user-table-container">
        <div class="table-responsive">
            <table class="table table-striped table-hover align-middle">
                <thead class="table-primary">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Телефон</th>
                        <th scope="col">Email</th>
                        <th scope="col">ИНН</th>
                        <th scope="col">Статус</th>
                        <th scope="col" style="min-width: 130px;">Дата создания</th>
                        <th scope="col">Дата обновления</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id" tabindex="0" aria-label="Пользователь">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>
                            <a :href="'tel:' + user.phone" class="text-decoration-none">{{ user.phone }}</a>
                        </td>
                        <td>
                            <a :href="'mailto:' + user.email" class="text-decoration-none">{{ user.email }}</a>
                        </td>
                        <td>{{ user.INN || '-' }}</td>
                        <td>
                            <select class="form-select form-select-sm status" v-model="user.statusId"
                                :disabled="isLoading" @change="changeUserStatus(user)" aria-label="Изменение статуса">
                                <option v-for="status in statuses" :key="status.id" :value="status.id">
                                    {{ status.name }}
                                </option>
                            </select>
                        </td>
                        <td>{{ formatDate(user.createdAt) }}</td>
                        <td>{{ formatDate(user.updatedAt) }}</td>
                    </tr>
                    <tr v-if="users.length === 0">
                        <td colspan="8" class="text-center text-muted py-4">Работодатели не найдены</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import User from '@/models/User'
import Status from '@/models/Status'
import useApi from '@/composibles/useApi'
import { getAllEmployers, getStatuses, setEmployerStatus } from '@/service/adminService'
import { formatDate } from '@/helpers/componentHelper'
import statusesName from '@/helpers/statuses.js'

const users = ref([])
const statuses = ref([])
const { isLoading, ExecuteApiCommand } = useApi()

async function fetchUsers() {
    return await ExecuteApiCommand(() => getAllEmployers(), (result) => { users.value = result.data }, (_) => { });
}

async function fetchStatuses() {
    return await ExecuteApiCommand(() => getStatuses(), (result) => { statuses.value = result.data }, (_) => { });
}

async function changeUserStatus(user) {
    await ExecuteApiCommand(() => setEmployerStatus(user.id, user.statusId), (result) => { alert('Успешно изменено') }, (_) => { alert('Не удалось изменить статус') });
}

onMounted(async () => {
    await fetchUsers()
    await fetchStatuses()
    statuses.value = statuses.value.filter(s => {
        const name = s.name.toLowerCase();
        return name !== statusesName.invitation && name !== statusesName.deny;
    });
})
</script>

<style scoped>
.status {
    max-width: 450px;
}

.user-table-container {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
    font-family: 'Inter', sans-serif;
    color: #212529;
}

.table thead {
    background: linear-gradient(90deg, #6f42c1, #6610f2);
    color: white;
    border-bottom: none;
}

.table tbody tr:hover {
    background: rgba(111, 66, 193, 0.1);
    cursor: pointer;
    transition: 0.2s ease background-color;
}

.form-select-sm {
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
    height: 30px;
    min-width: 160px;
}
</style>
