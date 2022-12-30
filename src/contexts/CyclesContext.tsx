import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState
} from 'react';

import { differenceInSeconds } from 'date-fns';

import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction
} from '../reducers/Cycles/Actions';
import { Cycle, cyclesReducer } from '../reducers/Cycles/CyclesReducer';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (value: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({
  children
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null
    },
    () => {
      const storedStateAsJson = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0'
      );
      if (storedStateAsJson) {
        return JSON.parse(storedStateAsJson);
      }
    }
  );
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }
    return 0;
  });

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState);
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJson);
  }, [cyclesState]);

  function setSecondsPassed(value: number) {
    setAmountSecondsPassed(value);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: new Date().getMilliseconds().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    };

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
    setAmountSecondsPassed(0);
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        cycles
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
