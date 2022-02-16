import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import star from '../star.svg';
import starOutline from '../star-thin.svg';


const StyledTask = styled.div`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  align-items: center;
  color: #333;
  display: flex;
`;

const Title = styled.div`
  flex-grow: 1;
  padding-right: 1rem;
  input {
   width: 100%;
   line-height: 24px;
  }
`

const PinButton = styled.button`
  background-color: transparent;
  border: none;
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
          <Title className="title">
            <input type="text" value={title} readOnly={true} placeholder="Input title" />
          </Title>
    
          <div className="actions" onClick={event => event.stopPropagation()}>
            {state !== 'TASK_ARCHIVED' && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <PinButton onClick={() => onPinTask(id)}>
                {state == 'TASK_PINNED'
                ? <img src={star} id={`pinTask-${id}`} aria-label={`pinTask-${id}`} width="15" height="15" />
                : <img src={starOutline} id={`pinTask-${id}`} aria-label={`pinTask-${id}`} width="15" height="15" />
                }
              </PinButton>
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
