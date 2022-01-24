import { Component, OnInit } from '@angular/core';
import { GenetiqueService } from 'src/app/core/service/genetique-service';
import { Carte } from 'src/app/shared/carte/carte';
import { Tile } from 'src/app/shared/carte/tile';
import { TileType } from 'src/app/shared/carte/tile-type';
import { Evaluation } from 'src/app/shared/genetique/evaluation';
import { Genome } from 'src/app/shared/genetique/genome';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  canvas: any
  ctx: any

  tileSize: number = 32

  constructor(private genetiqueService: GenetiqueService) { 
    
  }

  numeroGeneration(): number { return this.genetiqueService.generation; }


  ngOnInit(): void {
    this.canvas = document.getElementById("carte");
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
    }
    this.drawCarte();
  }

  onNext(): void {
    this.genetiqueService.updatePopulation();
    this.clean();
    this.drawCarte();
  }

  onNext10(): void {
    for (let i = 0; i < 10; i++) this.genetiqueService.updatePopulation();
    this.clean();
    this.drawCarte();
  }

  clean(): void {
    this.ctx.clearRect(0, 0, 800, 600);
  }


  drawChemin(): void {
    const best: Genome = this.genetiqueService.getBest();
    const coords: Array<[number, number]> = Evaluation.allCoord(best, this.genetiqueService.carte);
    this.ctx.fillStyle = "#00FFFF";

    for (let i = 0; i < coords.length - 1; i++) {
      const p1: [number, number] = coords[i];
      const p2: [number, number] = coords[i + 1];
      
      this.ctx.beginPath();

      this.ctx.moveTo(p1[1] * this.tileSize + this.tileSize / 2, p1[0] * this.tileSize + this.tileSize / 2);
      this.ctx.lineTo(p2[1] * this.tileSize + this.tileSize / 2, p2[0] * this.tileSize + this.tileSize / 2);

      this.ctx.stroke();
    }
  }

  drawCarte(): void {

    if (this.ctx) {
      const carte = this.genetiqueService.carte;
      const tileSize = 32;
      for (let l = 0; l < carte.grid.length; l++) {
        for (let c = 0; c < carte.grid[l].length; c++) {
          let current: Tile = carte.grid[l][c];
          switch (current.type) {
            case TileType.Mur: {
              this.ctx.fillStyle = "#D74022";
              this.ctx.fillRect(c *tileSize, l * tileSize, tileSize, tileSize); 
              break;
            }
            case TileType.Depart: {
              this.ctx.fillStyle = "#00FF00";
              this.ctx.fillRect(c *tileSize, l * tileSize, tileSize, tileSize);
              break;
            } 
            case TileType.Arrive: {
              this.ctx.fillStyle = "#0000FF";
              this.ctx.fillRect(c * tileSize, l * tileSize, tileSize, tileSize);
              break;
            }    
            default: { 
              //statements; 
              break; 
            }   
          }
        }
      }

      // on dessine le meilleur
      for (let i = 0; i < this.genetiqueService.population.genomes.length; i++) {
        let best: Genome = this.genetiqueService.population.genomes[i];
        let bestPosition: [number, number] = Evaluation.coordonneeFinale(best, carte);
        this.ctx.fillStyle = "#FF00FF";
        this.ctx.fillRect(bestPosition[1] *tileSize, bestPosition[0] * tileSize, tileSize, tileSize); 
      }

      let best: Genome = this.genetiqueService.getBest();
      let bestPosition: [number, number] = Evaluation.coordonneeFinale(best, carte);
      this.ctx.fillStyle = "#00FFFF";
      this.ctx.fillRect(bestPosition[1] *tileSize, bestPosition[0] * tileSize, tileSize, tileSize); 

      this.drawChemin();

    }
  }

}
