import { Category } from "./Category";

export class Menu{
    id: string;
    categories: Category[]

    constructor(id: string, categories:Category[]){
        this.id = id;
        this.categories = categories
    }
}