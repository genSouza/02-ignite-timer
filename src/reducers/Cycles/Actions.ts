import { Cycle } from './CyclesReducer';

export const CycleActions = {
  INTERRUPT_CURRENT_CYCLE: 'INTERRUPT_CURRENT_CYCLE',
  ADD_NEW_CYCLE: 'ADD_NEW_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED: 'MARK_CURRENT_CYCLE_AS_FINISHED'
} as const;

export type ActionsType = typeof CycleActions[keyof typeof CycleActions];

export function addNewCycleAction(newCycle: Cycle) {
  return { type: CycleActions.ADD_NEW_CYCLE, payload: { newCycle } };
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: CycleActions.MARK_CURRENT_CYCLE_AS_FINISHED
  };
}

export function interruptCurrentCycleAction() {
  return {
    type: CycleActions.INTERRUPT_CURRENT_CYCLE
  };
}
