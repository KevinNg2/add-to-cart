// functionality from firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://add-to-cart-893e8-default-rtdb.firebaseio.com/"
}

// app variable
const app = initializeApp(appSettings)

// database variable feeding the app
const database = getDatabase(app)

// reference where all the shopping list items are saved
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    // use the firebase function to push inputValue to the database
    push(shoppingListInDB, inputValue)

    clearInputFieldEl()

});

onValue(shoppingListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        console.log(snapshot.val())


        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItem)
        }

    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }

})
// clear the input field when button is pressed
function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""

}

// setting the value of empty string
function clearInputFieldEl() {
    inputFieldEl.value = ""
}
// appending new shopping list to the el
function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}