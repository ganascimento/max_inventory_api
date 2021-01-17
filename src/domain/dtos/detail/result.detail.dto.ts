export class ResultDetailDto {
    inventoryId: string;
    description: string;
    date: Date;
    isAdd: boolean;

    constructor (inventoryId: string, description: string, date: Date, isAdd: boolean) {
        this.inventoryId = inventoryId;
        this.description = description;
        this.date = date;
        this.isAdd = isAdd;
    }
}