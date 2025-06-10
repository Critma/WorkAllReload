export default class VacancyResponse {
    constructor(id, created_at, status, candidate, vacancy) {
        this.id = id;
        this.created_at = created_at;
        this.status = status;
        this.candidate = candidate;
        this.vacancy = vacancy
    }
}