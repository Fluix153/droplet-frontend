import { WalletResponse } from './wallet-response';
import { WalletEntity } from '../../domain/model/wallet.entity';

export class WalletAssembler {
    static fromResponse(response: WalletResponse): WalletEntity {
        return new WalletEntity({
            balance: response.balance,
            rewardsPoints: response.rewardsPoints,
            cashbackRate: response.cashbackRate,
            nextPayoutDate: new Date(response.nextPayoutDate),
        });
    }
}
