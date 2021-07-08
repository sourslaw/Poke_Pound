$(document).ready(function () {
    let userid = 0;
    let idforseller = 0;
  
    //filter card selection in shop
    $("#searchBarFilt").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $(".card").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  
    //get user data to get the user id
    $.get("api/user_data").then(function (data) {
      userid = data.id;
    })
  
    newWallet();
    getPokemon();
  
    //on button click
    $(document).on("click", ".buy-btn", function () {
  
      let id = $(this).data("id");
  
      //This checks to see if they are trying to buy their own item
      $.get("/api/price/" + id).then(function (data) {
        if (data.id === userid) {
          alert("Can't buy your own item");
        }
        else {
  
          $.ajax({
            method: "PUT",
            url: `/api/buy/${id}`
          }).then(getPokemon);
  
          //Allow them to purchase
          getPrice(id);
          idforseller = data.id;
        }
  
      });
    });
  
    // function to get price of the selected pokemon
    function getPrice(id) {
  
      $.get("/api/price/" + id).then(function (data) {
        var newPrice = parseInt(data.price);
        getWallet(newPrice);
      });
    }
  
    // function to get the current balance in the user wallet
    function getWallet(newPrice) {
  
      $.get("/api/wallet").then(function (data) {
        var balance = parseInt(data.wallet);
        checkout(newPrice, balance);
        $(".wallet-name").text("$" + balance);
      });
    }
  
    function checkout(newPrice, balance) {
  
      //able to buy
      if (balance >= newPrice) {
        var newBalance = balance - newPrice;
        getSellerWallet(newPrice, idforseller, newBalance);
  
      }
      //unable to buy
      else {
        alert("Not enough funds");
      }
    }
  
    //function to update wallet
    function updateWallet(newBalance) {
  
      $.ajax({
        method: "PUT",
        url: "/api/wallet",
        data: {
          wallet: newBalance
        }
      }).then(location.reload());
  
    }
  
    function getSellerWallet(newPrice, id, update) {
  
      $.get("/api/wallet/" + id).then(function (data) {
        var sellerwallet = data.wallet;
        var newbalance = parseInt(sellerwallet) + newPrice;
        updateSellerWallet(newbalance, id, update);
      });
  
    }
  
    function updateSellerWallet(newbalance, id, update) {
  
      $.ajax({
        method: "PUT",
        url: "/api/sellerwallet",
        data: {
          wallet: newbalance,
          id: id
        }
      })
  
      updateWallet(update);
    }
  
    //Get the balance of the wallet and display
    function newWallet() {
  
      $.get("/api/wallet").then(function (data) {
        var balance = parseInt(data.wallet);
        $(".wallet-name").text("$" + balance);
      })
    };
  
    function getPokemon() {
      $.get("/api/sell_data", function (data) {
        console.log(data);
        if (data.length !== 0) {
          data.map(poke => {
  
            if (poke.sold === false) {
  
              let readyPoke = "#poke-name"
  
              readyPoke(readyPoke, poke);
  
            }
          })
        }
      });
    };
  });