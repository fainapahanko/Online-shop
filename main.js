let url = "https://strive-school-testing-apis.herokuapp.com/api/product/"
let username = "user15"
let password = "sHHU5KWmVE26avC8"
let token = btoa(username + ":" + password)

loadItem = async(id) => {
    let event = await getEvent(id)
    console.log("event", event)
    document.querySelector("#item-div").innerHTML = `
    <div>
        <img src="${event.imageUrl}" class="item-img" />
    </div>    
    <div>
        <h4>${event.name}</h4>
    </div>
    <div>
        <h4> ${event.price}</h4>
    </div>
`
}

loadItems = async() => {
    
    let resp = await fetch(url,{
        headers: {
        "authorization" : "Basic " + token
    }
    })
    let jsonResp = await resp.json()
    document.querySelector("#shopcart").innerHTML = jsonResp.map(product => 
    `
    <div class="col-ms-3 cards">
        <div>
            <img src="${product.imageUrl}" class="item-img" />
        </div>    
        <div>
            <h4> <a href="detailspage.html?productId=${product._id}" class="col-12">${product.name}</a></h4>
        </div>
        <div>
            <h4> ${product.price}</h4>
        </div>
    </div>
    `
    ).join("")
    console.log(jsonResp)
}

loadItemsBackOffice = async() => {

        const events = await getEvents();
        console.log("events", events)
        let itemsList = document.querySelector("#itemsList")

        if(events.length > 0){
            itemsList.innerHTML = events.map(event => 
            `
            <div class="item-element">
                <div id="div${event._id}">
                <h4>${event.name} - $${event.price}</h4> 
                <a role="button" id="${event._id}"  class="btn btn-delete btn-danger" onclick="deleteItem('${event._id}')">Delete</a>
                <a role="button" id="${event._id}"  class="btn btn-delete btn-secondary" href="backoffice.html?id=${event._id}">Edit</a>
                </div>
            </div>
            `).join("")
        } else {
            itemsList.innerHTML = `
            <h2>No items at the moment</h2>
            `
        } 
}

deleteEvent = async (event_id) => {
    const response = await fetch(url +  event_id, {
        method: "DELETE",
        headers: {
            "authorization" : "Basic " + token,
        }
    })
    return response.ok
}

getEvent = async(id) => {
    const response = await fetch(url + id, {
        headers: {
            "authorization" : "Basic " + token,
        }
    })
    return await response.json()
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

    const response = await fetch(url, {
        method:"POST",
        body: JSON.stringify(event),
        headers: {
        "authorization" : "Basic " + token,
        "Content-Type": "application/json"
    }
    })
    return response
}

updateEvent = async (id, event) => {

    let response = await fetch(url + id, {
        method:"PUT",
        body: JSON.stringify(event),
        headers: {
        "authorization" : "Basic " + token,
        "Content-Type": "application/json"
    }
    })
    return response

}