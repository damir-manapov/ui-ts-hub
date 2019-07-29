import * as qs from 'querystring';
import axios from 'axios';
import {
  ERepositoryRoutes,
  IBaseSchema,
  IGetListOptions,
  ISharedBaseRepository,
  TWithPouchMeta,
  EEntityName,
} from '../../shared/types';
import { getRepositoryMethodRoute } from '../../shared/utils';

/**
 * Базовый класс для всех репозиториев.
 */
export abstract class BaseBrowserRepository<Schema extends IBaseSchema>
  implements ISharedBaseRepository<Schema> {
  protected httpClient = axios.create({
    baseURL: 'http://localhost:8081/api',
  });

  public abstract entityName: EEntityName;

  private getMethodRoute = (route: ERepositoryRoutes) => {
    return getRepositoryMethodRoute(this.entityName, route);
  };

  /**
   * Возвращает сущность по ID.
   * @param id
   */
  public getById = async (
    id: Schema['id'],
  ): Promise<TWithPouchMeta<Schema> | null> => {
    const { data } = await this.httpClient.get<TWithPouchMeta<Schema> | null>(
      `${this.getMethodRoute(ERepositoryRoutes.GetById)}?id=${id}`,
    );

    return data;
  };

  /**
   * Возвращает кол-во сущностей.
   */
  public getCount = async (): Promise<number> => {
    const { data } = await this.httpClient.get<number>(
      this.getMethodRoute(ERepositoryRoutes.GetCount),
    );

    return data;
  };

  /**
   * Возвращает список сущностей по указанным опциям
   * @param options
   */
  public getList = async (
    options = {} as IGetListOptions,
  ): Promise<Array<TWithPouchMeta<Schema>>> => {
    const { data } = await this.httpClient.get<Array<TWithPouchMeta<Schema>>>(
      this.getMethodRoute(ERepositoryRoutes.GetList)
      + `?${qs.stringify(options as Record<string, any>)}`,
    );

    return data;
  };

  /**
   * Создает сущность.
   * @param entity
   */
  public insert = async (entity: Schema): Promise<TWithPouchMeta<Schema>> => {
    const { data } = await this.httpClient.post<TWithPouchMeta<Schema>>(
      this.getMethodRoute(ERepositoryRoutes.Insert),
      entity,
    );

    return data;
  };

  /**
   * Обновляет сущность.
   * @param entity
   */
  public update = async (
    entity: TWithPouchMeta<Schema>,
  ): Promise<TWithPouchMeta<Schema>> => {
    const { data } = await this.httpClient.post<TWithPouchMeta<Schema>>(
      this.getMethodRoute(ERepositoryRoutes.Update),
      entity,
    );

    return data;
  };

  /**
   * Удаляет сущность.
   * @param id
   */
  public delete = async (id: Schema['id']): Promise<TWithPouchMeta<Schema>> => {
    const { data } = await this.httpClient.post<TWithPouchMeta<Schema>>(
      this.getMethodRoute(ERepositoryRoutes.Delete),
      { id },
    );

    return data;
  };
}
