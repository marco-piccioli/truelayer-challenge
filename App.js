import React, { Component } from 'react';
import PokemonResults from './components/pokemon_results';
import PokemonError from './components/pokemon_error';
import './style.css';
import axios from 'axios';

class PokemonForm extends Component {
  constructor(prop){
    super(prop);
    this.state = {
    pokemon_name: '',
    pokemon_results: [],
    pokemon_error: '',
    favorites: [],
    favorite_action: 'Add to Favorites',
    favorite_button: 'button-favorite'
  };
  if (localStorage.getItem('favorites') === null) {
    let initArray = new Array();
    localStorage.setItem('favorites', JSON.stringify(initArray));
  }
  console.log(this.state.favorites);
  }


  handleSubmit = event => {
      event.preventDefault();
      this.setState({ pokemon_error: '' });
      this.setState({ pokemon_results: [] });
      this.setState({ favorite_action: 'Add to Favorites' });
      this.setState({ favorite_button: 'button-favorite' });
      if (localStorage.getItem('favorites') !== null && localStorage.getItem('favorites') !== undefined) {
      this.state.favorites = JSON.parse(localStorage.getItem('favorites'));
      }
      console.log(this.state.favorites);
      if(this.state.pokemon_name==='') {
        this.setState({ pokemon_error: 'Please insert a search key!' });
        return false;
      }
      let target_url='http://localhost:5000/pokemon/'+this.state.pokemon_name;
      //if(this.state.pokemon_name==='') { target_url='http://localhost:5000/pokemons'; } else { target_url='http://localhost:5000/pokemons/'+this.state.pokemon_name; }
      axios.get(target_url)
        .then((data)=>{
          if (data.data[0].name  === undefined )  {
            this.setState({ pokemon_error: 'No match for the key!' })
            return false;
          }
          this.setState({ pokemon_results: data.data });
          console.log('form result '+this.state.favorites);
          console.log('result name '+data.data[0].name);
          //if(this.state.favorites.includes(data.data[0].name)) {
          if (this.state.favorites.indexOf(data.data[0].name)!==-1) {
             this.setState({favorite_action: 'Remove from Favorites!'});
             this.setState({favorite_button: 'button-favorite-gold'});
          }
        })
    }
  handleChange = event => {
      this.setState({ pokemon_name: event.target.value});
      this.setState({ pokemon_error: '' });
    }

  handleClick = value => {
    if (this.state.favorites.indexOf(value)===-1) {
      this.state.favorites.push(value);
      this.setState({favorite_action: 'Remove from Favorites'});
      this.setState({favorite_button: 'button-favorite-gold'});
    } else {
      this.state.favorites = this.state.favorites.filter(item => item !== value)
      this.setState({favorite_action: 'Add to Favorites'});
      this.setState({favorite_button: 'button-favorite'});
    }
    localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
  }


render() {
  return (
    <>
          <div className="header"><img className="header_image" src={require('./images/pokemon-shakespeare.png')}/></div>
          <div className="header"><h1>Welcome to the Pokemon-Shakespeare Database</h1></div>
          <p>Please insert the name of a Pokemon (case-insensitive) to get its Shakespearized description</p>
          <form onSubmit = { this.handleSubmit }>
          <input type='text' name='name' onChange={this.handleChange} />
          <button type='submit' className='button-search'>Search</button>
          </form>
          <PokemonResults pokemon_results={this.state.pokemon_results} favorite_action={this.state.favorite_action} favorite_button={this.state.favorite_button} handleClick={this.handleClick}/>
          <PokemonError pokemon_error={this.state.pokemon_error} />
    </>
        );
      }
}

export default PokemonForm;
