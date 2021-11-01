import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { solutions as defaultSolution } from './solutions';

interface ButtonItemProps {
  hidden: boolean
  onClick(value: string): void
  value: string
}

const ButtonItem = ({ value, hidden, onClick }: ButtonItemProps) => {
  const handleClick = () => {
    onClick(value)
  }

  return (
    <button
      disabled={!hidden}
      className={`btn btn-${hidden ? 'secondary' : value}`}
      onClick={handleClick} />
  )
}

/**
 * You can find solutions in : `src/solution.js`
 */
const MemoryGame = ({ className = '', solutions = defaultSolution }) => {
  const initialButtonsState = solutions.map(() => true)
  
  const [solved, setSolved] = useState(0)
  const [userTry, setUserTry] = useState(0)
  const [buttonsState, setButtonsState] = useState(() => initialButtonsState)
  const [savedValue, setSavedValue] = useState<{ index: number, value: string }[]>([])

  const totalSolved = solutions.length / 2

  const forceHideButtonWithIndex = (index: number) => {
    setButtonsState((prevState) => (
      [
        ...prevState.slice(0, index),
        true,
        ...prevState.slice(index + 1)
      ]
    ))
  }

  const handleButtonItemClick = (index: number) => (value: string) => {
    setButtonsState((prevState) => {
      const selectedHidden = prevState[index]
      return [
        ...prevState.slice(0, index),
        !selectedHidden,
        ...prevState.slice(index + 1)
      ]
    })
    setSavedValue((prevValue) => ([...prevValue, { index, value }]))
  }
  const handleButtonResetClick = () => {
    setSolved(0)
    setUserTry(0)
    setButtonsState(initialButtonsState)
  }

  useEffect(() => {
    if (savedValue.length === 2) {
        const [savedValue1, savedValue2] = savedValue
        if (savedValue1.value === savedValue2.value) {
            setSolved((prevSolved) => prevSolved + 1)
        } else {
            setTimeout(() => {
              savedValue.map(({ index }) => forceHideButtonWithIndex(index))
            }, 1000)
        }
        setUserTry((prevUserTry) => prevUserTry + 1)
        setSavedValue([])
    }
  }, [savedValue])

  useEffect(() => {
    if (solved === totalSolved) {
      if (userTry === totalSolved) {
        alert('Congratulations, you have perfect score!')
      } else {
        alert('Congratulations, you have finished this game')
      }
    }
  }, [solved, totalSolved, userTry])

  return <>
    <div className={className}>
      <h1 className='mb-4'>Memory Game</h1>
      <div className="memory-grid">
        {/* Render your buttons here */}
        {
          solutions.map((solution, index) => {
            return (
              <ButtonItem
                key={`button-${index}`}
                hidden={buttonsState[index]}
                value={solution}
                onClick={handleButtonItemClick(index)}  />
            )
          })
        }
      </div>
      <div className='scoreboard mt-4'>
        <div className="d-flex justify-content-between">
          <h5>{`${solved} / ${totalSolved} Solved`}</h5>
          <h5>{`${userTry} Tries`}</h5>
        </div>
        <button
          onClick={handleButtonResetClick}
          className='btn btn-info w-100'>Reset</button>
      </div>
    </div>
  </>;
};

export default styled(MemoryGame)`
  margin: 100px auto;
  width: 500px;

  h1 {
    text-align: center;
  }

  .scoreboard {
    padding: 0px 12px;
  }

  .memory-grid {
    display: grid;
    grid-template-columns: auto auto auto auto;
    .btn {
      margin-bottom: 20px;
      justify-self: center;
      height: 100px;
      width: 100px;
      cursor: not-allowed;
      &.btn-secondary {
        cursor: pointer;
      }
    }
  }
`;