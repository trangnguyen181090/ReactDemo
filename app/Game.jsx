'use strict';
import React from 'react';
import  _ from 'lodash';

// define start

const Stars = (props) => {
    //const numberOfStars = 1 + Math.floor(Math.random()*9);
   console.log('>> numberOfStars',props.randomNumberStars);
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
    return (
        <div className="col-2">
            <button>=</button>
        </div>
    )
}

const Answer = (props) => {
    return (
        <div className="col-5">
        {props.numbersSelected.map((number,i) =>
            <span key={i}>{number}</span>
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

class Game extends React.Component{
    constructor(){
        super();
        this.state = {
            numberSelected: [],
            numberOfStars:1 + Math.floor(Math.random()*9)
        };

        this.selectNumber = (clickedNumber) => {
            if(this.state.numberSelected.indexOf(clickedNumber) >=0){
                return;
            }
            this.setState(prevState => ({
                numberSelected: prevState.numberSelected.concat(clickedNumber)
            }));
        }
    }
    render(){
        return (
            <div className="col">
                <h3>Play nice</h3>
                <hr/>
                <div className="row">
                    <Stars randomNumberStars={this.state.numberOfStars}/>
                    <Button/>
                    <Answer numbersSelected={this.state.numberSelected}/>
                </div>
                <br/>
                <Numbers selectNumber={this.selectNumber} numbersSelected={this.state.numberSelected}/>
                
            </div>
        )
    }
}

export default Game;