import React, { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { differenceInSeconds } from 'date-fns';

import { CyclesContext } from '../../index.page';

import * as s from './styles';

export const CountDown = () => {
  const {
    activeCycle,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed
  } = useContext(CyclesContext);

  const { reset } = useFormContext();

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}: ${seconds}`;
    }
  }, [minutes, seconds]);
  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const difference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (difference === totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(0);
          reset();
        } else {
          setSecondsPassed(difference);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  return (
    <s.CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <s.Separator>:</s.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </s.CountDownContainer>
  );
};
