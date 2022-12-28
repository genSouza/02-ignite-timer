import React, { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { CyclesContext } from '../../../../contexts/CyclesContext';

import * as s from './styles';

const NewCycleForm = () => {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
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
        disabled={!!activeCycle}
        {...register('task')}
      />

      <label htmlFor="minutesAmount">Durante</label>
      <s.MinuteAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={1}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </s.FormContainer>
  );
};

export default NewCycleForm;
