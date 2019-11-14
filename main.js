let url = "https://strive-school-testing-apis.herokuapp.com/api/product/"
let username = "user15"
let password = "sHHU5KWmVE26avC8"
let token = btoa(username + ":" + password)

loadItems = async() => {
    
    let resp = await fetch(url,{
        headers: {
        "authorization" : "Basic " + token
    }
    })
    let jsonResp = await resp.json()
    document.querySelector("#shopcart").innerHTML = jsonResp.map(product => 
    `
    <div class="col-ms-4">
        <img src="${product.imageUrl}" style="width:300px; height="300px" />
        <h1 href="detailspage.html?productId=${product._id}">${product.brand} - $ ${product.price} </h1>
    </div>
    `
    ).join("")
    console.log(jsonResp)
}

loadItemsBackOffice = async() => {
        const events = await getEvents();
        console.log("events", events)

        let itemsList = document.querySelector("#itemsList")
        itemsList.innerHTML = events.map(event => 
        `
          <div>
            <div id="div${event._id}">
              <h4>${event.name} - $${event.price}</h4> 
              <a role="button" id="${event._id}"  class="btn btn-delete btn-danger" onclick="deleteItem(this.id)">Delete</a>
            </div>
          </div>
        `).join("")
}

deleteItem = async (id) => {
    let response = await fetch(url + "\\" + id, {
        method: "DELETE",
        headers: {
            "authorization" : "Basic " + token,
        }
    })
    let resp = await response.json()

}

getEvents = async() => {
    const response = await fetch(url, {
        headers: {
            "authorization" : "Basic " + token,
        }
    })
    return await response.json()
}

saveEvent = async event => {

    let response = await fetch(url, {
        method:"POST",
        body: JSON.stringify(event),
        headers: {
        "authorization" : "Basic " + token,
        "Content-Type": "application/json"
    }
    })
    return response
}