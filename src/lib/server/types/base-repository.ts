// @ts-ignore
import * as PouchDB from 'pouchdb';
import * as uuid from 'uuid';
import {
  IBaseSchema,
  ISharedBaseRepository,
  IGetListOptions,
  TWithPouchMeta,
  EEntityName,
} from '../../shared/types';

/**
 * Базовый класс для всех репозиториев.
 */
export abstract class BaseServerRepository<Schema extends IBaseSchema>
  implements ISharedBaseRepository<Schema> {
  public abstract entityName: EEntityName;
  protected abstract db: PouchDB.Database<Schema>;

  /**
   * Возвращает сущность по ID.
   * @param id
   */
  public getById = async (
    id: Schema['id'],
  ): Promise<TWithPouchMeta<Schema> | null> => {
    const { docs } = await this.db.find({
      selector: { id, deletedAt: null },
    });

    return docs[0] || null;
  };

  /**
   * Возвращает кол-во сущностей.
   */
  public getCount = async (): Promise<number> => {
    return (await this.db.allDocs()).rows.length;
  };

  /**
   * Возвращает список сущностей по указанным опциям
   * @param options
   */
  public getList = async (
    options = {} as IGetListOptions,
  ): Promise<Array<TWithPouchMeta<Schema>>> => {
    const {
      filter = {},
      limit = 20,
      offset = 0,
    } = options;
    const listOptions = {
      selector: {
        ...filter,
        deletedAt: {
          $exists: false,
        },
      },
      skip: offset,
      limit,
    };

    const { docs } = await this.db.find(listOptions);

    return docs;
  };

  /**
   * Создает сущность.
   * @param data
   */
  public insert = async (data: Schema): Promise<TWithPouchMeta<Schema>> => {
    const nextData = { ...data, id: uuid() } as Schema;
    const { id, rev } = await this.db.post(nextData);

    return {
      ...nextData,
      _id: id,
      _rev: rev,
    };
  };

  /**
   * Обновляет сущность.
   * @param data
   */
  public update = async (
    data: TWithPouchMeta<Schema>,
  ): Promise<TWithPouchMeta<Schema>> => {
    const { id, rev } = await this.db.put(data);

    return { ...data, _id: id, _rev: rev };
  };

  /**
   * Удаляет сущность.
   * @param id
   */
  public delete = async (id: Schema['id']): Promise<TWithPouchMeta<Schema>> => {
    const entity = await this.getById(id);
    const copy = { ...entity, deletedAt: new Date().getTime() };

    return await this.update(copy);
  };
}
