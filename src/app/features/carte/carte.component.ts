import { Component, OnInit } from '@angular/core';
import { GenetiqueService } from 'src/app/core/service/genetique-service';
import { Carte } from 'src/app/shared/carte/carte';
import { Tile } from 'src/app/shared/carte/tile';
import { TileType } from 'src/app/shared/carte/tile-type';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  tileSize: number = 16;
  canvas: any
  ctx: any
  carte: Carte

  constructor(private genetiqueService: GenetiqueService) { 
    this.carte = this.loadCarte();
  }

  numeroGeneration(): number { return this.genetiqueService.generation; }

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

  ngOnInit(): void {
    this.canvas = document.getElementById("carte");
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
    }
    this.drawCarte();
  }

  onNext(): void {
    this.genetiqueService.updatePopulation();
  }

  drawCarte(): void {
    if (this.ctx) {
      
      for (let l = 0; l < this.carte.grid.length; l++) {
        for (let c = 0; c < this.carte.grid[l].length; c++) {
          let current: Tile = this.carte.grid[l][c];
          switch (current.type) {
            case TileType.Mur: {
              this.ctx.fillStyle = "#D74022";
              this.ctx.fillRect(c * this.tileSize, l * this.tileSize, this.tileSize, this.tileSize); 
              break;
            }
            case TileType.Depart: {
              this.ctx.fillStyle = "#00FF00";
              this.ctx.fillRect(c * this.tileSize, l * this.tileSize, this.tileSize, this.tileSize);
              break;
            } 
            case TileType.Arrive: {
              this.ctx.fillStyle = "#0000FF";
              this.ctx.fillRect(c * this.tileSize, l * this.tileSize, this.tileSize, this.tileSize);
              break;
            }    
            default: { 
              //statements; 
              break; 
            }   
          }
        }
      }
      
      //this.ctx.fillRect(25, 25, 150, 150);


      //this.ctx.fillStyle = "rgba(0,0,0,0.5)";
      //this.ctx.clearRect(60, 60, 120, 120);
      //this.ctx.strokeRect(90, 90, 80, 80);
    }
  }

}
