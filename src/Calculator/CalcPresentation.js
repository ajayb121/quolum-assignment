import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './index.css';

const CalcPresentation = ({
  inputVal,
  isDarkMode,
  isAdvancedOptionVisible,
  updateMode,
  calcBtns,
  advancedBtns,
  showAdvancedButtons,
}) => {

  const themeStyles = isDarkMode ? "dark" : "light";

  return (
    <div className={`container ${themeStyles}`}>
      <div className="header">Calculator</div>
      <div className="themeBtnContainer">
        <div onClick={() => updateMode(false)}>Light Theme</div>
        <div onClick={() => updateMode(true)}>Dark Theme</div>
      </div>
      <div className="wrapper">
        <div className="inputContainer">{inputVal}</div>
        <div className="calcContainer">{
          calcBtns.map((column, index) => {
            return (
              <div key={index} className="column">
                {column.map(({ label, operation }) => (
                  <div key={label} onClick={operation}>{label}</div>
                ))}
              </div>
            )
          })
        }</div>
        {isAdvancedOptionVisible && (<div className="advanceBtnContainer">
          {advancedBtns.map(({ label, operation }) => (
            <div key={label} onClick={operation}>{label}</div>
          ))}
        </div>
        )}
      </div>
      <div className="advancedTxt" onClick={showAdvancedButtons}>Advanced</div>
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
        />
      </div>
    </div>
  )
}

export default CalcPresentation;