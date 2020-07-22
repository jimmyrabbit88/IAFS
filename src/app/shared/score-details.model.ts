import { firestore } from 'firebase';

export class ScoreDetails {
    public statement?: string;
    
    constructor(
        public homeTeam: boolean,
        public type: number,
        public score: string,
        public time: firestore.Timestamp,
        public player?: string,
        public playerNum?: number,
        public distance?: number,
        public scoreDetail?: string,
        public passer?: string,
        public isMadeFg?: boolean,
        public xpmade?: boolean,
        public tptMade?: boolean,
        public ptaPlayer?: string,
        public ptaPlayerNum?: number
    ){
        this.statement = this.generateStatement()
    }

    public generateStatement():string {
        var str = '';
        
        this.player? str += this.player : str += "unknown"
        this.playerNum? str += ("(" + this.playerNum + ") " ) : str + "() "
        this.distance && this.scoreDetail!= "Safety"? str += (this.distance + " yd "): str + '';
        switch(this.scoreDetail){
        case "TD Run":{
            str += "run";
            break;
        }
        case "TD Pass":{
            str += "pass from ";
            this.passer? str += this.passer : str+= "unknown"
            break;
        }
        case "TD P6":{
            str += "Interception Return ";
            break;
        }
        case "TD FR":{
            str += "Fumble Return";
            break;
        }
        case "TD PR":{
            str += "Punt Return";
            break;
        }
        case "TD KR":{
            str += "Kick-off Return";
            break;
        }
        case "Safety":{
            str += "safety";
            break;
        }
        case "FG Made":{
            str += "Field Goal";
            break;
        }

        }
        this.xpmade? str += (" (" + this.ptaPlayer + " kick) "): str += '';
        this.xpmade==false? str += "(xp failed)": str += '';
        console.log(str)
        return str;
    }
}