import { Tile } from "./tile";
import { TileType } from "./tile-type";

export class Carte {
    grid: Array<Array<Tile>>

    constructor(grid: Array<Array<Tile>>) {
        this.grid = grid;
    }

    positionDepart(): [number, number] {
        for (let l = 0; l < this.grid.length; l++) {
            for (let c = 0; c < this.grid[l].length; c++) {
                let current = this.grid[l][c];
                if (current.type === TileType.Depart) return [l, c]
            }
        }

        return [-1,-1];
    }

    positionArrive(): [number, number] {
        for (let l = 0; l < this.grid.length; l++) {
            for (let c = 0; c < this.grid[l].length; c++) {
                let current = this.grid[l][c];
                if (current.type === TileType.Arrive) return [l, c]
            }
        }

        return [-1,-1];
    }
}