import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public games;

  constructor(private db: AngularFirestore) {
   }

  public getGames(){
    console.log("retrieving games data...");
    return this.db.collection("items").snapshotChanges();
  }

  public getGame(key){
    console.log("retrieving single game data...");
    return this.db.collection("items", ref => ref.where('gameId', '==', key)).snapshotChanges();
  }

  public getGameIncidents(key){
    console.log("retrieving incidents data for a given game...");
    return this.db.collection("gameIncidents", ref => ref.where('gameId', '==', key)).snapshotChanges();
  }

  public addGame(data) {
    console.log("Attempting to add document for new game...");
    return new Promise<any>((resolve, reject) =>{
        this.db
            .collection("items")
            .add(data)
            .then(res => {}, err => reject(err));
    });
  }

  public addGameIncidents(data) {
    console.log("attempting to add a game incidents document for added game...");
    return new Promise<any>((resolve, reject) =>{
        this.db
            .collection("gameIncidents")
            .add(data)
            .then(res => {}, err => reject(err));
    });
  }

  public nextId(){
    return this.db
      .collection("items")
      .valueChanges()
  }


  public updateScore(isHomeTeam: boolean, score: number, game){
    console.log("Attempting to update score in Games(items)...");
    if(isHomeTeam){
      this.db
      .collection("items")
      .doc(game.payload.doc.id)
      .update({"home.score" : firebase.firestore.FieldValue.increment(score)});
    }
    else{
      this.db
      .collection("items")
      .doc(game.payload.doc.id)
      .update({"away.score": (game.payload.doc.data().away.score + score)});
    }
  }

  public updateMoment(game, moment){
    console.log("Attempting to update Moments...");
    this.db
      .collection("gameIncidents")
      .doc(game.payload.doc.id)
      .update({moments : firebase.firestore.FieldValue.arrayUnion(moment)});
  }
    
    
    
    
  
}
