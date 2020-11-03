import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

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

//GAMES
  // GET
  /**
   * Return an observable for a list of all games.
   */
  public getGames(){
    console.log("retrieving games data...");
    return this.db.collection("items").valueChanges();
  }

  //LAST update from here where we just mapped the data properly
  public getGamesWeek(from, to){
    console.log("retrieving games data...");
    return this.db
      .collection("items", ref => ref
        .where('ko', '>=', from)
        .where('ko', '<', to)
        )
      .snapshotChanges()
      .pipe(map(res => {
        const gamesArray = [];
        for(const key in res){
         gamesArray.push(res[key].payload.doc.data());
        }
        return gamesArray;
      }));
  }

  public getGame(key){
    console.log("retrieving single game data...");
    return this.db
      .collection("items", ref => ref
        .where('gameId', '==', key))
      .snapshotChanges()
      .pipe(map(res => {
        let game:any = res[0].payload.doc.data();
        game.id = res[0].payload.doc.id;
        return game;
      }));
  }

    public getRecentMatches(game: any){
    console.log("Getting recent results...");
    return this.db
      .collection("items", ref => ref
      .where('teams', 'array-contains', 6))
      // .orderBy('ko', 'desc'))
      .snapshotChanges()
      .pipe(map(results => {
        console.log(game)
        console.log(results)
        // var res:any[] = results.map(e => e.payload.doc.data())
        // var older:any[] = res.filter(e => e.ko < game.ko);
        // var areFinished:any[] = older.filter(e => e.FinalScore);
        // var lastFive:any[] = areFinished.slice(0,5)
        // console.log("now");
        //console.log(lastFive)
        // for(let key in res){
        //   if(res[key].FinalScore){
        //     let teams:number[] = res[key].teams;
        //   let score:string = res[key].FinalScore;
        //   let splitScore:string[] = score.split(':');
        //   if(+splitScore[0] == +splitScore[1]){
        //     awayRes.push({id : res[key].gameId, result: 0})
        //   }
        //   else{
        //     if(teams.indexOf(game.teams[1]) == 0){
        //       awayRes.push({id:res[key].gameId, result: (+splitScore[0] > +splitScore[1]) ? 1 : -1})
        //     }
        //     else{
        //       awayRes.push({id:res[key].gameId, result: (+splitScore[0] > +splitScore[1]) ? -1 : 1})
        //     }
        //   }
        //   }  
        // }
        // console.log(awayRes)
        return [1,1];
      }))
  }

  public nextId(){
    return this.db
      .collection("items")
      .valueChanges().pipe(map(res => {
        if(res.length >= 1){
          const result:any = (res.reduce((prev: any, current: any) => (+prev.gameId > +current.gameId) ? prev : current));
          let id = +result.gameId;
          return id + 1;
        }
        else{
          return 1;
        }
      }))
  }

  //PUSH
  public addGame(data) {
    console.log("Attempting to add document for new game...");
    return new Promise<any>((resolve, reject) =>{
        this.db
            .collection("items")
            .add(data)
            .then(res => {}, err => reject(err));
    });
  }

  //UPDATE

  public updateScore(isHomeTeam: boolean, score: number, game){
    console.log("Attempting to update score in Games(items)...");
    if(isHomeTeam){
      this.db
      .collection("items")
      .doc(game.id)
      .update({"home.score" : firebase.firestore.FieldValue.increment(score)});
    }
    else{
      this.db
      .collection("items")
      .doc(game.id)
      .update({"away.score": (game.away.score + score)});
    }
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

//GAME INCIDENTS
  //GET

  public getGameIncidents(key){
    console.log("retrieving incidents data for a given game...");
    return this.db
      .collection("gameIncidents", ref => ref.where('gameId', '==', key))
      .snapshotChanges()
      .pipe(map(res => {
        let gameIncidentData:any = res[0].payload.doc.data();
        gameIncidentData.id = res[0].payload.doc.id;

        return gameIncidentData;
      }));
  }




  //PUSH
  public addGameIncidents(data) {
    console.log("attempting to add a game incidents document for added game...");
    return new Promise<any>((resolve, reject) =>{
        this.db
            .collection("gameIncidents")
            .add(data)
            .then(res => {}, err => reject(err));
    });
  }

  //UPDATE

  public updateMoment(game, moment){
    console.log("Attempting to update Moments...");
    this.db
      .collection("gameIncidents")
      .doc(game.id)
      .update({moments : firebase.firestore.FieldValue.arrayUnion(moment)});
  };

  public nextQuarter(game){
    console.log("Attempting to change to next quarter");
    this.db
      .collection("gameIncidents")
      .doc(game.id)
      .update({"quarter" : firebase.firestore.FieldValue.increment(1)});
  }

  public endGame(game){
    console.log("Setting game to be finished");
    this.db
      .collection("gameIncidents")
      .doc(game.id)
      .update({"quarter" : -1});
    
    //Update the final score for game information  
    this.setFinalScore(game.gameId);
  }

//USERS
  //GET

  public isAdminApproved(uid : string) {
    var docref = this.db.firestore.collection("users").doc(uid);
    return docref.get().then((res) => {
      return res.data().admin;
    });
  }

  //PUSH
  public addUserToCollection(res){
    // Attempting to add user to database
    const data = {
      'email': res.user.email,
      'admin': false
    }
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${res.user.uid}`);
    return userRef.set(data, {merge: true})
  }



//TEAMS
  //GET

  public getTeams(){
    console.log("retrieving games data...");
    return this.db.collection("teams").valueChanges();
  }






  
}
