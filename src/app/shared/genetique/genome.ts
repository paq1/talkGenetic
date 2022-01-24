import { Gene } from "./gene";

export class Genome {
    genes: Array<Gene>
    
    constructor(genes: Array<Gene>) {
        this.genes = genes;
    }
}