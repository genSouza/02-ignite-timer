import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from 'phosphor-react';
import * as zod from 'zod';

import { CyclesContext } from '../../contexts/CyclesContext';
import { CountDown } from './components/CountDown';
import NewCycleForm from './components/NewCycleForm';

import * as s from './styles';

type NewCycleFormData = zod.infer<typeof newTaskValidationSchema>;

const newTaskValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O intervalo precisaser no mínimo de 5 minutos')
    .max(60, 'O intervalo precisa ser no máxmio de 60 minutos.')
});

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newTaskValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 1
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm;
  const task = watch('task');
  const isSubmitDisabled = !task;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  function handleInterruptCurrentCycle() {
    interruptCurrentCycle();
    reset();
  }
  return (
    <s.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
          <CountDown />
        </FormProvider>

        {activeCycle ? (
          <s.StopCountDownButton
            onClick={handleInterruptCurrentCycle}
            type="button"
          >
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
