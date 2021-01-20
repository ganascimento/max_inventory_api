export class RemoveProductDto {
    id: string;
    userId: string;

    constructor(id: string) {
        this.id = id;
    }
}