/**
 * Минимальный набор свойств, коим должна обладать сущность.
 */
export interface IBaseSchema {
  id?: string;
  deletedAt?: number | null;
}
