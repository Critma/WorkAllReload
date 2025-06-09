export default class Resume {
    constructor(id = 0, candidate_id, experience_id, description, created_at, updated_at){
        this.id = id;
        this.candidate_id = candidate_id;
        this.experience_id = experience_id;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}