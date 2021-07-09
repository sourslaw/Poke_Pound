const buyButtHandler = async (obj) => {

  const saleId = obj.id;
  
  console.log(`you clicked ${saleId}`);

  const response = await fetch(`/api/sale/${saleId}`, {
      method: 'PUT',
      // body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
  });

  console.log(response);

  if (response.ok) {
      document.location.replace('/buy'); // the next page that displays after the form is submitted. in this case, the home page
  } else {
      alert('failed to create sale');
  }
};


document
  .querySelector('#pokeCardBuyButt')
  .addEventListener('click', buyButtHandler);