import { useContext } from 'react';

import { CyclesContext } from '../../contexts/CyclesContext';

import * as s from './styles';

export function History() {
  const { cycles } = useContext(CyclesContext);
  return (
    <s.HistoryContainer>
      <h1>Meu Histórico</h1>

      <s.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>{cycle.startDate.toISOString()}</td>
                  <td>
                    {cycle.finishedDate && (
                      <s.Status statusColor="green">Concluído</s.Status>
                    )}
                    {cycle.interruptedDate && (
                      <s.Status statusColor="red">Interrompido</s.Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <s.Status statusColor="yellow">Em andamento</s.Status>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </s.HistoryList>
    </s.HistoryContainer>
  );
}
