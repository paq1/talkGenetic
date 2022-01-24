import { TileType } from "../../carte/tile-type";
import { Gene } from "../gene";
import { Genome } from "../genome";
import { Mutation } from "./mutation";

export class MutationRandom implements Mutation {
    muter(genome: Genome): Genome {
        let genes: Array<Gene> = Object.assign([], genome.genes);
        genes[0] = Gene.Droite;
        return new Genome(genes);
    }
}