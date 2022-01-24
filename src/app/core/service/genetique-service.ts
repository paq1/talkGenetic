import { Injectable } from "@angular/core";
import { Carte } from "src/app/shared/carte/carte";
import { Tile } from "src/app/shared/carte/tile";
import { TileType } from "src/app/shared/carte/tile-type";
import { Croisement } from "src/app/shared/genetique/croisements/croisement";
import { CroitementMoitie } from "src/app/shared/genetique/croisements/croisement-moitie";
import { Evaluation } from "src/app/shared/genetique/evaluation";
import { Gene } from "src/app/shared/genetique/gene";
import { Genome } from "src/app/shared/genetique/genome";
import { Mutation } from "src/app/shared/genetique/mutations/mutation";
import { MutationRandom } from "src/app/shared/genetique/mutations/mutation-random";
import { Population } from "src/app/shared/genetique/population";

@Injectable({
    providedIn: 'root'
})
export class GenetiqueService {
    generation: number = 1;
    taillePopulation: number = 100;
    tailleGenome: number = 20;
    tauxCroisement: number = 20;
    tauxMutation: number = 5;
    carte: Carte;
    population: Population;
    croisement: Croisement = new CroitementMoitie();
    mutation: Mutation = new MutationRandom();
    constructor() {
        this.carte = this.loadCarte();
        this.population = this.initPopulation();
    }


    initPopulation(): Population {
        let genomes: Array<Genome> = new Array<Genome>();
        for (let i = 0; i < this.taillePopulation; i++) {
            genomes.push(this.generateRandomGenome());
        }

        return new Population(genomes);
    }

    private nextGeneration(): Population {
        let newGenomes: Array<Genome> = new Array<Genome>();
        let popInit: Array<Genome> = this.population.genomes;
        
        popInit.sort((a, b) => {
            return Evaluation.evaluate(a, this.carte) - Evaluation.evaluate(b, this.carte); 
        });
        
        // on sauvegarde le meilleur
        newGenomes.push(popInit[0]);

        for (let i = 1; i < popInit.length * (20 / 100); i++) {
            // on croise les element deux à deux
            let p1: Genome = popInit[i];
            let p2: Genome = popInit[i+1];

            newGenomes.push(this.croisement.croiser(p1, p2));
        }

        while (newGenomes.length < popInit.length) {
            newGenomes.push(this.generateRandomGenome());
        }

        return new Population(newGenomes);
    }

    updatePopulation(): void {
        this.population = this.nextGeneration();
        this.generation++;
    }

    private generateRandomGenome(): Genome {
        let genes: Array<Gene> = new Array<Gene>();
        for (let i = 0; i < this.tailleGenome; i++) {
            let rand = this.getRandomInt(4);
            switch (rand) {
                case 0: 
                    genes.push(Gene.Haut);
                    break;
                case 1: 
                    genes.push(Gene.Droite);
                    break;
                case 2: 
                    genes.push(Gene.Bas);
                    break;
                case 3: 
                    genes.push(Gene.Gauche);
                    break;
            }
        }

        return new Genome(genes);
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    loadCarte(): Carte {
        let carte: Array<string> = [
            "11111111111111111111",
            "12000000000000000001",
            "10000000000000000001",
            "10001000000000000001",
            "10001000000000000001",
            "10000000000000000001",
            "10000011100000000001",
            "10000000000000000001",
            "10000001111111100001",
            "10000000000010000001",
            "10000000000010000001",
            "10000000000010000001",
            "10000000000010000001",
            "10000000000000000031",
            "11111111111111111111",
        ];

        let carteMap: Array<Array<Tile>> = carte
            .map(ligne => Array.from(ligne).map(element => {
                if (element === '1') return {type: TileType.Mur}
                else if (element === '2') return {type: TileType.Depart}
                else if (element === '3') return {type: TileType.Arrive}
                else return {type: TileType.Chemin}
            }));

        return new Carte(carteMap);
    }
}