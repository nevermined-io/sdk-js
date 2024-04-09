import { RoyaltyScheme } from './RoyaltyScheme.abstract'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export class StandardRoyalties extends RoyaltyScheme {
  public static async getInstance(config: InstantiableConfig): Promise<StandardRoyalties> {
    return RoyaltyScheme.getInstance(config, 'StandardRoyalties', StandardRoyalties, true)
  }
}
