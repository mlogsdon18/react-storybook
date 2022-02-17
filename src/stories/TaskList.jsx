import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Task from './Task';
import check from '../check.svg';


export default function TaskList({ loading, tasks, onPinTask, onArchiveTask }) {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const Message = styled.div`
    text-align: center;
  `

  const LoadingRow = (
    <div className="cmp-loading">
      <span className="cmp-loading__checkbox glow-checkbox" />
      <span className="cmp-loading__text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="cmp-list" key={"empty"} data-testid="empty">
        <Message className="cmp-message">
          <img className="cmp-message__icon icon-check" src={check} />
          <div className="cmp-message__title">You have no tasks</div>
          <div className="cmp-message__subtitle">Sit back and relax</div>
        </Message>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];

  return (
    <div className="cmp-list">
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}


TaskList.propTypes = {
/** Checks if it's in loading state */
  loading: PropTypes.bool,
  /** The list of tasks */
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
};
TaskList.defaultProps = {
  loading: false,
};
