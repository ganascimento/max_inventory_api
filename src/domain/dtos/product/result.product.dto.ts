export class ResultProductDto {
    id: string;
    name: string;
    value: number;
    identCode: string;
    description: string;
    unitType: string;
    brand: string;

    constructor(id: string, name: string, value: number, identCode: string, description: string, unitType: string, brand: string) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.identCode = identCode;
        this.description = description;
        this.unitType = unitType;
        this.brand = brand;
    }
}