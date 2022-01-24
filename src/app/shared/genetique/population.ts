import { Genome } from "./genome";

export class Population {
    genomes: Array<Genome>
    constructor(genomes: Array<Genome>) {
        this.genomes = genomes;
    }
}