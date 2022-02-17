import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskState } from '../lib/store';
import Task from './Task';
import check from '../check.svg';


export default function TaskList() {
  // We're retrieving our state from the store
  const tasks = useSelector((state) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter((t) => t.state !== 'TASK_PINNED'),
    ];
    const filteredTasks = tasksInOrder.filter(
      (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
    return filteredTasks;
  });

  const { status } = useSelector((state) => state.taskbox);

  const dispatch = useDispatch();

  const pinTask = (value) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED' }));
  };
  const archiveTask = (value) => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }));
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

  if (status === 'loading') {
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

  return (
    <div className="cmp-list">
      {tasks.map((task) => (
        <Task 
          key={task.id} 
          task={task}
          onPinTask={(task) => pinTask(task)}
          onArchiveTask={(task) => archiveTask(task)} 
        />
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
