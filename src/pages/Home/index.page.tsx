import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from 'phosphor-react';
import * as zod from 'zod';

import * as s from './styles';

const newTaskValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O intervalo precisaser no mínimo de 5 minutos')
    .max(60, 'O intervalo precisa ser no máxmio de 60 minutos.')
});

type NewCycleFormData = zod.infer<typeof newTaskValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newTaskValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5
    }
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: new Date().getMilliseconds().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount
    };

    setCycles(state => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    reset();
  }

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
  console.log('🚀 ~ file: index.page.tsx:51 ~ Home ~ activeCycle', activeCycle);

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <s.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <s.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <s.TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />

          <label htmlFor="minutesAmount">Durante</label>
          <s.MinuteAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </s.FormContainer>
        <s.CountDownContainer>
          <span>0</span>
          <span>0</span>
          <s.Separator>:</s.Separator>
          <span>0</span>
          <span>0</span>
        </s.CountDownContainer>
        <s.StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </s.StartCountDownButton>
      </form>
    </s.HomeContainer>
  );
}
