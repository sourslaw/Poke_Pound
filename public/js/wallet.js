const newWallet = document.getElementById('currentWallet');

const url = '/api/user/wallet';

fetch(url)
    .then(
        function newWallet() {
            router.get("/api/user/wallet").then(function (data) {
                var balance = parseInt(data.wallet);
                $(".wallet-name").text("$" + balance);   

            }
        )});

getPoke();

    function getPoke() {
        router.get("/api/sale", function (data) {
            console.log(data);
            if (data.length !== 0) {
                data.map(pokemon => {

                    if (pokemon.sold === true) {

                        let recentSold = "#pokeCard__dashboard"
                        console.log(pokemon);

                        placePoke(recentSold, pokemon);

                    }
                })
            }
        })
    
};