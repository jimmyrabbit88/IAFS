import { firestore } from 'firebase';

export class ScoreDetails {
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
    ){}
}
