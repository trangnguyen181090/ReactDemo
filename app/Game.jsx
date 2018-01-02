'use strict';
import React from 'react';
import  _ from 'lodash';

// define start
// bit.ly/s-pcs
var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };
  
const Stars = (props) => {
    //const numberOfStars = 1 + Math.floor(Math.random()*9);
    let stars = [];
    for(let i = 0;i<props.randomNumberStars;i++){
        stars.push(<i key={i} className="fa fa-star"></i>);
    }
    return (
        <div className="col">
            {stars}
        </div>
    )
}

const Button = (props) => {
    let button;

    switch(props.answerIsCorrect){
        case true:
            button = 
            <button className="btn btn-success" onClick={props.acceptAnswer}>
                <i className="fa fa-check"></i>
            </button>
            break;
        case false:
            button = 
            <button className="btn btn-danger">
                <i className="fa fa-times"></i>
            </button>;
            break;
        default:
            button = <button className="btn" 
            onClick={props.checkAnswer}
            disabled={props.numbersSelected.length ===0}>=</button>;
            break;
    }
    return (
        <div className="col-2">
            {button}
            <br/><br/>
            <button className="btn btn-sm btn-warning" onClick={props.redraw} disabled={props.redraws===0}>
                <i className="fa fa-refresh"></i> {props.redraws}
            </button>

        </div>
    )
}

const Answer = (props) => {
    return (
        <div className="col-5">
        {props.numbersSelected.map((number,i) =>
            <span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>
        )}
        </div>
    )
}

const Numbers = (props) => {
    //const numbers = _.range(0,9);
    const numberClassName = (number) => {
        if(props.numbersSelected.indexOf(number) >= 0){
            return 'selected';
        }
        if(props.usedNumbers.indexOf(number) >= 0){
            return 'used';
        }
    } 
    
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) => 
                    <span onClick={() => props.selectNumber(number)} key ={i} className={numberClassName(number)}>{number}</span>
                )}
                {/* <span>1</span>
                <span className="selected">2</span>
                <span className="used">3</span> */}
            </div>
        </div>
    )
};
Numbers.list = _.range(1,10);

const DoneFrame = (props) => {
    return(
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <br/>
            <button className="btn" onClick={props.resetGame}>Play game</button>
        </div>
    )
}

class Game extends React.Component{
    //static randomNumber = () => 1 + Math.floor(Math.random()*9);
    //var randomNumber = 1 + Math.floor(Math.random()*9);
    constructor(){
        super();
        this.state = {
            selectedNumbers: [],
            usedNumbers:[],
            numberOfStars:1 + Math.floor(Math.random()*9),
            answerIsCorrect:null,
            redraws: 5,
            doneStatus: null
        };

        this.resetGame = () =>{
            this.setState( prevState => ({
                selectedNumbers: [],
                usedNumbers:[],
                numberOfStars:1 + Math.floor(Math.random()*9),
                answerIsCorrect:null,
                redraws: 5,
                doneStatus: null
            }));
        }

        this.selectNumber = (clickedNumber) => {
            if(this.state.selectedNumbers.indexOf(clickedNumber) >=0){
                return;
            }
            this.setState(prevState => ({
                answerIsCorrect: null,
                selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
            }));
        }

        // unselected answer

        this.unselectNumber = (clickedNumber) => {
            this.setState(prevState => ({
                selectedNumbers: prevState.selectedNumbers.filter(number => number != clickedNumber)
            }));
        };

        this.checkAnswer = () => {
            this.setState(prevState => ({
                answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc,n) => acc + n, 0)
            }));
        };

        this.acceptAnswer = () => {
            this.setState(prevState => ({
                usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
                selectedNumbers:[],
                answerIsCorrect: null,
                numberOfStars:1 + Math.floor(Math.random()*9), 
                
            }), this.updateDoneStatus);
        };

        this.redraw = () =>{
            if(this.state.redraws == 0){
                return;
            }
            this.setState(prevState =>({
                numberOfStars: 1 + Math.floor(Math.random()*9), 
                answerIsCorrect: null,
                selectedNumbers:[],
                redraws: prevState.redraws -1
            }), this.updateDoneStatus);
        }

        this.possibleSolutions = ({numberOfStars, usedNumbers}) => {
            const possibleNumbers = _.range(1, 10).filter(number =>
                usedNumbers.indexOf(number) === -1
            );
            return possibleCombinationSum(possibleNumbers, numberOfStars);
        };

        this.updateDoneStatus = () => {
            this.setState(prevState => {
                if(prevState.usedNumbers.length ===9){
                    return {doneStatus: 'Done. Nice!'};
                }
                if(prevState.redraws === 0 && !this.possibleSolutions(prevState)){
                    return {doneStatus: 'Game over!'};
                }
            });
        }
    }
    render(){
        const {numberOfStars, selectedNumbers, answerIsCorrect,usedNumbers, redraws,doneStatus} = this.state;
        return (
            <div className="col">
                <h3>Play nice</h3>
                <hr/>
                <div className="row">
                    <Stars randomNumberStars={numberOfStars}/>
                    <Button numbersSelected={selectedNumbers}
                            checkAnswer={this.checkAnswer}
                            answerIsCorrect={answerIsCorrect}
                            acceptAnswer={this.acceptAnswer}
                            redraw={this.redraw}
                            redraws={redraws}
                    />
                    <Answer unselectNumber={this.unselectNumber} numbersSelected={selectedNumbers}/>
                </div>
                <br/>
                {doneStatus ? 
                <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}/> :
                <Numbers usedNumbers={usedNumbers} selectNumber={this.selectNumber} numbersSelected={selectedNumbers}/>
                }
                
            </div>
        )
    }
}

export default Game;