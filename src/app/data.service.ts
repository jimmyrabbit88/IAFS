import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public games;

  constructor(private db: AngularFirestore,) {
    db.firestore.settings({
      ignoreUndefinedProperties: true,
    })
  }

  public getGames(){
    console.log("retrieving games data...");
    return this.db.collection("items").snapshotChanges();
  }

  public getGamesWeek(from, to){
    console.log("retrieving games data...");
    return this.db.collection("items", ref => ref.where('ko', '>=', from).where('ko', '<', to)).snapshotChanges();
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
  };

  public isAdminApproved(uid : string) {
    var docref = this.db.firestore.collection("users").doc(uid);
    return docref.get().then((res) => {
      return res.data().admin;
    });
  }

  public addUserToCollection(res){
    // Attempting to add user to database
    const data = {
      'email': res.user.email,
      'admin': false
    }
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${res.user.uid}`);
    return userRef.set(data, {merge: true})
  }

  public nextQuarter(game){
    console.log("Attempting to change to next quarter");
    console.log(game.payload.doc.id)
    this.db
      .collection("gameIncidents")
      .doc(game.payload.doc.id)
      .update({"quarter" : firebase.firestore.FieldValue.increment(1)});
  }

  public endGame(game){
    console.log("Setting game to be finished");
    this.db
      .collection("gameIncidents")
      .doc(game.payload.doc.id)
      .update({"quarter" : -1});
    
    //Update the final score for game information  
    this.setFinalScore(game.payload.doc.data().gameId);
  }

  public setFinalScore(key){
    console.log("Attempting to update Final score in ")
     this.db
      .collection("items", ref => ref.where('gameId', '==', key))
      .get()
      .subscribe((res) => {
        this.db
          .collection("items")
          .doc(res.docs[0].id)
          .set({"FinalScore" : res.docs[0].data().away.score + " : " + res.docs[0].data().home.score}, {merge : true});
      })
     
  }
  
}
