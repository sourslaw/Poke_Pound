$(document).ready(function () {

    newWallet();

    //Get the balance of the wallet and display
    function newWallet() {

        $.get("/api/wallet").then(function (data) {
            var balance = parseInt(data.wallet);
            $(".wallet-name").text("$" + balance);
        })
    };

    getPoke();

    function getPoke() {
        $.get("/api/sell_data", function (data) {
            console.log(data);
            if (data.length !== 0) {
                data.map(pokemon => {

                    if (pokemon.sold === true) {

                        let recentSold = "#recent-sold"
                        console.log(pokemon);

                        placePoke(recentSold, pokemon);

                    }
                })
            }
        })
    }
});