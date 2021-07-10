// pokemon dropdown populate
const saleDropDownEl = document.getElementById('pokeSaleDropdown');
saleDropDownEl.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Select the Pokemon species . . .';

saleDropDownEl.add(defaultOption);
saleDropDownEl.selectedIndex = 0;

const url = '/api/pokemon';

fetch(url)    
    .then(    
        function(response) {    
            if (response.status !== 200) {    
                console.warn('Looks like there was a problem. Status Code: ' + 
                    response.status);    
                return;    
            }

            response.json().then(function(data) {    
                let option;
        
            for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.text = data[i].pokemon;
                option.value = data[i].id;
                saleDropDownEl.add(option);
                }        
            });    
            }
    )    
    .catch(function(err) {    
        console.error('Fetch Error -', err);    
    });
// end pokemon dropdown populate

// new SALE handler
const newSaleHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#pokeSaleName').value;
    const price = document.querySelector('#pokeSalePrice').value;
    const attack = document.querySelector('#pokeSaleAttack').value;
    const defense = document.querySelector('#pokeSaleDefense').value;
    const description = document.querySelector('#pokeSaleDescription').value;
    const pokemon_id = document.querySelector('#pokeSaleDropdown').value;

    const response = await fetch(`/api/sale`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            price,
            attack,
            defense,
            description,
            pokemon_id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
    });

    console.log(response);

    if (response.ok) {
        document.location.replace('/'); // the next page that displays after the form is submitted. in this case, the home page
    } else {
        alert('failed to crate sale');
    }
};


document
  .querySelector('.new-sale-form')
  .addEventListener('submit', newSaleHandler);