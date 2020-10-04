import { FILTER_MODES } from 'common/constants';
import { ITodo } from './ITodo';

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}
