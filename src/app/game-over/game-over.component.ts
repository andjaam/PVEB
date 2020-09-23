import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from '../models/player.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit, OnDestroy {
  
  name: string;
  points: string;
  sub: Subscription[] = [];
  bestPlayers: Player[];
  
  constructor(private route: ActivatedRoute, private router: Router, private service: ChatService) { 
    let subic = route.paramMap.subscribe((params) => {
      this.name = params.get('name');
      this.points = params.get('points');
    });
    this.sub.push(subic);
  }

  ngOnInit(): void {
    this.sub.push(
      this.service.getBestPlayers().subscribe(ps => {
        this.bestPlayers = ps;
        console.log(ps);
      })
    );
  }
  
  ngOnDestroy(): void {
    this.sub.forEach(e => e.unsubscribe());
  }  
}
