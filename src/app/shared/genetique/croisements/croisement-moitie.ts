import { Gene } from "../gene";
import { Genome } from "../genome";
import { Croisement } from "./croisement";

export class CroitementMoitie implements Croisement {

    croiser(parent1: Genome, parent2: Genome): Genome {
        let genes: Array<Gene> = new Array<Gene>();

        let taille: number = parent1.genes.length;

        for (let i = 0; i < taille / 2; i++) {
            genes.push(parent1.genes[i]);
        }

        for (let i = taille / 2; i < taille; i++) {
            genes.push(parent2.genes[i]);
        }

        return new Genome(genes);
    }

}