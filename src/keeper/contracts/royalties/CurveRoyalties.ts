import { RoyaltyScheme } from './RoyaltyScheme.abstract'
import { InstantiableConfig } from '../../../Instantiable.abstract'

export class CurveRoyalties extends RoyaltyScheme {
  public static getInstance(config: InstantiableConfig): Promise<CurveRoyalties> {
    return RoyaltyScheme.getInstance(config, 'CurveRoyalties', CurveRoyalties, true)
  }
}
