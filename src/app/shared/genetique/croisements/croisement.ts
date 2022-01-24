import { Genome } from "../genome";

export interface Croisement {
    croiser(parent1: Genome, parent2: Genome): Genome;
}