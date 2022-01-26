import { Gene } from "../gene";
import { Genome } from "../genome";
import { Croisement } from "./croisement";

export class croisementAlternant implements Croisement {

    croiser(parent1: Genome, parent2: Genome): Genome {
        var genes: Array<Gene> = [];
        for(var i=0 ; i<parent1.genes.length;i++){
            if(Math.floor(Math.random()*(2 - 1 + 1)) + 1 ==2){
                genes.push(parent2.genes[i]);
            }
            else{
                genes.push(parent1.genes[i]);
            }
        }
        return new Genome(genes);
    }

}