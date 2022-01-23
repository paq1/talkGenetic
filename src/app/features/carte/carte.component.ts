import { Component, OnInit } from '@angular/core';
import { Carte } from 'src/app/shared/carte/carte';
import { Tile } from 'src/app/shared/carte/tile';
import { TileType } from 'src/app/shared/carte/tile-type';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  canvas: any
  ctx: any
  carte: Carte

  constructor() { 
    this.carte = this.loadCarte();
  }

  loadCarte(): Carte {
    let carte: Array<string> = [
      "11111111111111111111",
      "10000000000000000001",
      "10000000000000000001",
      "10000000000000000001",
      "10000000000000000001",
      "10000000000000000001",
      "11111111111111111111",
    ];

    let carteMap: Array<Array<Tile>> = carte
      .map(ligne => Array.from(ligne).map(element => {
        if (element === '1') return {type: TileType.Mur}
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

  drawCarte(): void {
    if (this.ctx) {
      this.ctx.fillStyle = "#D74022";
      this.ctx.fillRect(25, 25, 150, 150);

      this.ctx.fillStyle = "rgba(0,0,0,0.5)";
      this.ctx.clearRect(60, 60, 120, 120);
      //this.ctx.strokeRect(90, 90, 80, 80);
    }
  }

}
