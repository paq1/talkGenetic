import { Genome } from "../genome";

export interface Mutation {
    muter(genome: Genome): Genome;
}