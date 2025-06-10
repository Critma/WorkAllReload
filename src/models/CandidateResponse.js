export default class CandidateResponse {
    constructor(id, vacancy, status, vakans_id, status_id, created_at = null) {
        this.id = id,
        this.vacancy = vacancy,
        this.status = status,
        this.vakans_id = vakans_id,
        this.status_id = status_id,
        this.created_at = created_at;
    }
}