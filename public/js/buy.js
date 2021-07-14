// ADOPT a pokemon
const buyButtHandler = async (obj) => {
  const saleId = obj.id;
  
  const response = await fetch(`/api/sale/${saleId}`, {
      method: 'PUT',
      // body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
  });

  if (response.ok) {
      document.location.replace('/buy'); // the next page that displays after the form is submitted. in this case, the home page
  } else {
      alert('failed to create sale');
  }
};

// RETURN the pokemon to be adopted
const adoptionReturnHandler = async (obj) => {
  const saleId = obj.id;
  
  const response = await fetch(`/api/sale/return/${saleId}`, {
      method: 'PUT',
  });

  if (response.ok) {
      document.location.replace('/dashboard');
  } else {
      alert('failed to set the pokemon free:(');
  }
};

// FREE the pokemon (deletes the sale)
const freedomHandler = async (obj) => {
  const saleId = obj.id;
  
  const response = await fetch(`/api/sale/${saleId}`, {
      method: 'DELETE',
  });

  if (response.ok) {
      document.location.replace('/dashboard');
  } else {
      alert('failed to set the pokemon free:(');
  }
};

// Adopt Today button (directs to the Adopt page)
const adoptTodaynButtonHandler = async (event) => {
	window.open('https://pokemonstore1.herokuapp.com/buy', '_self', false);
};
// Rehome Today button (directs to the Adopt page)
const rehomeTodaynButtonHandler = async (event) => {
	window.open('https://pokemonstore1.herokuapp.com/sell', '_self', false);
};