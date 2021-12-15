const root = document.getElementById('root')
const grid = document.createElement('div')
grid.style = 'display: grid; grid-template-columns: 1fr 1fr;'
const data = async () => {
    const fetchData = await fetch('https://app.subsocial.network/subid/api/v1/chains/properties').then((response) => {
        return response.json();
    })
    const filteredData = Object.entries(fetchData).filter((el) => {
        return el[1].hasOwnProperty('tokenDecimals') && el[1].hasOwnProperty('tokenSymbol')
    })
    filteredData.map(async (el) => {
        const networkName = document.createElement('div')
        const networkStatusDiv = document.createElement('div')
        const img = document.createElement('img')
        img.style = 'width: 20px; height: 20px; object-fit: cover'
        img.setAttribute('src', `https://app.subsocial.network/subid/icons/${el[1].icon}`)
        networkName.textContent = el[0]
        const networkStatus = await fetch(`https://app.subsocial.network/subid/api/v1/check/${el[0]}`).then(res => res.json())
        networkStatusDiv.style = `border: 1px solid black; ${networkStatus ? 'background: green;' : 'background: red'}`
        networkStatusDiv.appendChild(img)
        grid.appendChild(networkName)
        grid.appendChild(networkStatusDiv)
        console.log(el)
    });
    root.appendChild(grid)
}
data();
setInterval(data, 300000)
