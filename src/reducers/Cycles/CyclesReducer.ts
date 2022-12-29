import { CycleActions } from './Actions';

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case CycleActions.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      };
    case CycleActions.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              interruptedDate: new Date()
            };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null
      };

    case CycleActions.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              finishedDate: new Date()
            };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null
      };
    default:
      return state;
  }
}