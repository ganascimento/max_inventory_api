export class ChangeAmountInventoryDto {
    id: string;
    value: number;
    userId: string;

    constructor(id: string, value: number) {
        this.id = id;
        this.value = value;
    }
}