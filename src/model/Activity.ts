export class Activity {
    constructor(
        public type: string,
        public probability: number,
    ) {
        this.type = type;
        this.probability = probability;
    }
}