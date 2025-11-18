export class WalletEntity {
    readonly balance: number;
    readonly rewardsPoints: number;
    readonly cashbackRate: number;
    readonly nextPayoutDate: Date;

    constructor(params: {
        balance: number;
        rewardsPoints: number;
        cashbackRate: number;
        nextPayoutDate: Date;
    }) {
        this.balance = params.balance;
        this.rewardsPoints = params.rewardsPoints;
        this.cashbackRate = params.cashbackRate;
        this.nextPayoutDate = params.nextPayoutDate;
    }

    getFormattedBalance(): string {
        return `$${this.balance.toFixed(2)}`;
    }

    getNextPayoutLabel(): string {
        return this.nextPayoutDate.toLocaleDateString();
    }
}
