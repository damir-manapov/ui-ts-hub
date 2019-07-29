// import * as PouchDB from 'pouchdb';
// import { IBaseSchema } from '../types';
//
// export function getRandomEntity<Entity>(entities: Entity[]): Entity {
//   return entities[Math.floor(Math.random() * entities.length)];
// }
//
// export async function fillDatabase<Entity extends IBaseSchema>(
//   db: PouchDB.Database<Entity>,
//   rows: Array<Omit<Entity, 'deletedAt'>>,
// ) {
//   const docs = await db.allDocs();
//   await Promise.all(
//     docs.rows.map(item => db.remove(item.id, item.value.rev)),
//   );
//
//   await Promise.all(
//     rows.map(item => db.post({ ...item, deletedAt: null } as Entity)),
//   );
// }
//
// export async function fetchEntities<Entity>(
//   db: PouchDB.Database<Entity>,
// ): Promise<Entity[]> {
//   return (await db.allDocs({ include_docs: true }))
//     .rows
//     .map(item => item.doc);
// }
//
// export function generateEntities<Entity>(
//   generate: () => Entity,
//   count: number,
// ): Entity[] {
//   return new Array(count).fill(null).map(generate);
// }
