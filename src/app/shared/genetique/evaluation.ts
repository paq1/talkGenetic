import { Carte } from "../carte/carte";
import { TileType } from "../carte/tile-type";
import { Gene } from "./gene";
import { Genome } from "./genome";

export class Evaluation {

    private static collideWithWall(coord: [number, number], carte: Carte): boolean {
        return carte.grid[coord[0]][coord[1]].type === TileType.Mur
    }

    static coordonneeFinale(genome: Genome, carte: Carte): [number, number] {
        let position: [number, number] = carte.positionDepart();
        let last: [number, number] = [position[0], position[1]];
        for (let i = 0; i < genome.genes.length; i++) {
            last = [position[0], position[1]];
            switch (genome.genes[i]) {
                case Gene.Haut:
                    position[0] -= 1
                    break;
                case Gene.Droite:
                    position[1] += 1
                    break;
                case Gene.Bas:
                    position[0] += 1
                    break;
                case Gene.Gauche:
                    position[1] -= 1
                    break;
            }

            if (this.collideWithWall(position, carte)) {
                console.log("collision");
                return last;
            }
        }
        return last;
    }

    static allCoord(genome: Genome, carte: Carte): Array<[number, number]> {
        
        let position: [number, number] = carte.positionDepart();
        let last: [number, number] = [position[0], position[1]];

        let res = new Array<[number, number]>();
        res.push(last);

        for (let i = 0; i < genome.genes.length; i++) {
            last = [position[0], position[1]];
            switch (genome.genes[i]) {
                case Gene.Haut:
                    position[0] -= 1
                    break;
                case Gene.Droite:
                    position[1] += 1
                    break;
                case Gene.Bas:
                    position[0] += 1
                    break;
                case Gene.Gauche:
                    position[1] -= 1
                    break;
            }

            if (this.collideWithWall(position, carte)) {
                return res;
            }
            res.push(last);
        }
        return res;
    }

    /**
     * retourne la distance par rapport à l'arrivee
     * @param genome 
     * @param carte 
     */
    static evaluate(genome: Genome, carte: Carte): number {
        let coordArrive: [number, number] = carte.positionArrive();
        let positionFinale: [number, number] = this.coordonneeFinale(genome, carte);

        const x1 = coordArrive[1];
        const y1 = coordArrive[0];
        const x2 = positionFinale[1];
        const y2 = positionFinale[0];

        return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))
    }
}