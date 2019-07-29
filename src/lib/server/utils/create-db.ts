import { EEntityName, IBaseSchema } from '../../shared/types';
import * as PouchDB from 'pouchdb';
import * as MemoryAdapter from 'pouchdb-adapter-memory';
import * as find from 'pouchdb-find';

PouchDB.plugin(find);
PouchDB.plugin(MemoryAdapter);

/**
 * Инициализирует базу данных из памяти.
 * @param name
 */
export function createDB<Entity extends IBaseSchema>(
  name: EEntityName,
): PouchDB.Database<Entity> {
  return new PouchDB<Entity>(name, {
    adapter: 'memory',
  });
}
