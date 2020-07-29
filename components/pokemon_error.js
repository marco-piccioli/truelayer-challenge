import React, { Component } from 'react';


class PokemonError extends Component {
  render() {
  return (
<div className='wrapper'>
<div className='result-error'>
{this.props.pokemon_error}
</div>
</div>
  )
};
};

export default PokemonError
