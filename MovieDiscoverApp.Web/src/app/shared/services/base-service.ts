import { environment } from '../../../environments/environment';

export abstract class BaseService {
  public baseUrl: string = environment.baseUrl;
}
