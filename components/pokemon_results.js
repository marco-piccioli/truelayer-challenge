import React, { Component } from 'react';

class PokemonResults extends Component {
  handleClick = event => {
        this.props.handleClick(event.target.value);
    }

  render() {
    const  is_favorite  = this.props.favorite_action;
    const  button_class = this.props.favorite_button;
  return (
<div className='wrapper'>
  {this.props.pokemon_results.map((pokemon_result, i) => (
    <div className='result' key={i}>
  <div className='result-body'>
  <img alt='{pokemon_result.name}' className='image' src={pokemon_result.image}/>
  <h5 className='result-title'>{pokemon_result.name}</h5>
  <p className='result-text'>{pokemon_result.description_sh}</p>
  <button className={button_class} onClick={this.handleClick} value={pokemon_result.name}>{is_favorite}</button>
  </div>
</div>
  ))}
</div>
  )
}
};

export default PokemonResults
