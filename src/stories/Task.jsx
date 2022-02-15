import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import star from '../star.svg';
import starOutline from '../star-thin.svg';


const StyledTask = styled.div`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: #333;
  display: flex;
`;

const Star = styled.button`
  width: 20px;
  height: 20px;
  ${({ active }) => active && `
    background: black;
  `}
`


export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
    return (
        <StyledTask className={`list-item ${state}`}>
          <label className="checkbox">
            <input
              type="checkbox"
              defaultChecked={state === 'TASK_ARCHIVED'}
              disabled={true}
              name="checked"
            />
            <span
              className="checkbox-custom"
              onClick={() => onArchiveTask(id)}
              id={`archiveTask-${id}`}
              aria-label={`archiveTask-${id}`}
            />
          </label>
          <div className="title">
            <input type="text" value={title} readOnly={true} placeholder="Input title" />
          </div>
    
          <div className="actions" onClick={event => event.stopPropagation()}>
            {state !== 'TASK_ARCHIVED' && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a onClick={() => onPinTask(id)}>
                {state == 'TASK_PINNED'
                ? <img src={star} id={`pinTask-${id}`} aria-label={`pinTask-${id}`} />
                : <img src={starOutline} id={`pinTask-${id}`} aria-label={`pinTask-${id}`} />
                }
              </a>
            )}
          </div>
        </StyledTask>
    );
}

Task.propTypes = {
/** Composition of the task */
task: PropTypes.shape({
/** Id of the task */
id: PropTypes.string.isRequired,
/** Title of the task */
title: PropTypes.string.isRequired,
/** Current state of the task */
state: PropTypes.string.isRequired,
}),
/** Event to change the task to archived */
onArchiveTask: PropTypes.func,
/** Event to change the task to pinned */
onPinTask: PropTypes.func,
};
