export class ResultProductDto {
    id: string;
    name: string;
    value: number;
    identCode: string;
    description?: string;
    unitType: string;
    brand?: string;
    amount: number;

    constructor(id: string, name: string, value: number, identCode: string, description: string, unitType: string, brand: string, amount: number) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.identCode = identCode;
        this.description = description;
        this.unitType = unitType;
        this.brand = brand;
        this.amount = amount;
    }
}