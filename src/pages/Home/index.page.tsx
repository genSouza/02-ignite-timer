import { createContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from 'phosphor-react';
import * as zod from 'zod';

import { CountDown } from './components/CountDown';
import NewCycleForm from './components/NewCycleForm';

import * as s from './styles';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (value: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
  type NewCycleFormData = zod.infer<typeof newTaskValidationSchema>;
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
  const newTaskValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
      .number()
      .min(1, 'O intervalo precisaser no mínimo de 5 minutos')
      .max(60, 'O intervalo precisa ser no máxmio de 60 minutos.')
  });

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newTaskValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 1
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function setSecondsPassed(value: number) {
    setAmountSecondsPassed(value);
  }

  function markCurrentCycleAsFinished() {
    setCycles(state =>
      state.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedDate: new Date()
          };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: new Date().getMilliseconds().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    };

    setCycles(state => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
    reset();
  }

  function handleInterruptCycle() {
    setCycles(state =>
      state.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date()
          };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
    setAmountSecondsPassed(0);
    reset();
  }

  const task = watch('task');
  const isSubmitDisabled = !task;
  return (
    <s.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
            <CountDown />
          </FormProvider>
        </CyclesContext.Provider>
        {activeCycle ? (
          <s.StopCountDownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </s.StopCountDownButton>
        ) : (
          <s.StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </s.StartCountDownButton>
        )}
      </form>
    </s.HomeContainer>
  );
}
