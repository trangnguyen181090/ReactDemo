'use strict';
import React from 'react';
import axios from 'axios';
import Game from './Game.jsx';

// class for header
class Header extends React.Component{
    render(){
        return(
            <div>
                <h1>Header</h1>
            </div>
        )
    }
}

// class for header
class Content extends React.Component{
    
    render(){
        return(
            <div>
                <h2>Content</h2>
                <p>The content text</p>
            </div>
        )
    }
}

// Build shop Cart
const Card = (props) => {
    return (
        <div style={{margin: '1em'}}>
            <img width="75" src={props.avatar_url} />
            <div style ={{display: 'inline-block', marginLeft: 10}}>
               <div className="info">{props.name}</div>     
               <div>{props.company}</div>
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
            {props.cards.map((card,i) => <Card key={card.id} {...card}/>)}
        </div>
    )
}

class Form extends React.Component{
    constructor(){
        super();
        this.state = {userName: ""};
        this.handleSubmit = (event) => {
            event.preventDefault();
            var _name = this.state.userName;
            var _url = 'https://api.github.com/users/' + _name;
            var me = this;
            axios.get(_url)
            .then(resp => {
                me.props.onSubmit(resp.data);
                me.setState({userName: ''});
            });
        }
    }
    
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                value={this.state.userName}
                onChange={(event) => this.setState({userName: event.target.value})}
                placeholder="Github username"/>
                <button type="submit">Add Card</button>
            </form>
        )
    }
}

// class shop Cart
class ShopCart extends React.Component{
    
    constructor(){
        super();
        this.state = {
            cards: []
        };

        this.addNewCard = (cardInfo) => {
            this.setState(prevState => ({
                cards: prevState.cards.concat(cardInfo)
            }));
        }
    }
    render(){
        return(
            <div className="col-12">
                <h2>Shopping Cart</h2>
                <div>
                    <Form onSubmit={this.addNewCard}/>
                    <CardList cards={this.state.cards}/>
                    <br/>
                    

                </div>
            </div>
        )
    }
}

class App extends React.Component {
    render() {
       return (
          <div className="container">
             {/* <Header/> */}
             {/* <Content/> */}
             <ShopCart/>
             <Game/>
          </div>
          
       );
    }
 }

export default App;