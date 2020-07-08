import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public games;

  constructor(private db: AngularFirestore) {
   }

  public getGames(){
    return this.db.collection("items").snapshotChanges();
  }

  public getGame(key){
    return this.db.collection("items", ref => ref.where('gameId', '==', key)).snapshotChanges();
  }

  public getGameIncidents(key){
    return this.db.collection("gameIncidents", ref => ref.where('gameId', '==', key)).snapshotChanges();
  }

  public check() {
    console.log(this.games[0]);
  }


  public addGame(data) {
    return new Promise<any>((resolve, reject) =>{
        this.db
            .collection("items")
            .add(data)
            .then(res => {}, err => reject(err));
    });
  }

  public addGameIncidents(data) {
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
  
}
