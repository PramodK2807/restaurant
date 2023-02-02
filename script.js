const url = "http://3.17.216.66:4000";

const getCity = async() => {
    let response = await fetch(`${url}/location`,{method:'GET'});
    let data = await response.json();
    console.log(data);
   
    data.map((item) => {
        let element = document.createElement('option');
        let text = document.createTextNode(item.state);
        element.appendChild(text);
        element.value = item.state_id;
        document.getElementById('city').appendChild(element);
        // console.log(item.state_id);
        // console.log(data);
    })
}

const getRest = async() => {
    let cityId = document.getElementById('city').value;
    let rest = document.getElementById('restaurant');
    while(rest.length>0){
        rest.remove(0)
    }
    let response = await fetch(`${url}/restaurant?stateId=${cityId}`,{method:'GET'});
    let data = await response.json()
    data.map((item) => {
        let element = document.createElement('option')
        let text = document.createTextNode(`${item.restaurant_name} | ${item.address}`)
        element.appendChild(text)
        rest.appendChild(element)
    })
}

// window.onload = () =>{
//     setTimeout(getCity, 1000);
// };


getCity();
// getRest()