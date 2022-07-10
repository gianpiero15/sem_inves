
Web3Provider = window.ethereum;

gunsBounty = {};

gunsContracts={};

let maximo = 0

const getAccount = async() =>{
    await Web3Provider.request({method: 'eth_requestAccounts'})
};


const getAllContracts = async() =>{
    const resp = await fetch("GunsContract.json");
    const contracts = await resp.json();

    gunsBounty =  TruffleContract(contracts);

    gunsBounty.setProvider(Web3Provider);

    gunsContracts = await gunsBounty.deployed();

    const dealsCounter =await gunsContracts.dealsCounter();

    maximo = dealsCounter.toNumber()

    let html = `        
    <table class="table mt-4 table-striped table-hover text-center">
    <thead>
        <tr>
        <th scope="col">Id</th>
        <th scope="col">Vendedor</th>
        <th scope="col">Dni V</th>
        <th scope="col">Licencia V</th>
        <th scope="col">N° Serie</th>
        <th scope="col">Comprador</th>
        <th scope="col">Dni C</th>
        <th scope="col">Licencia C</th>
        <th scope="col">FUT</th>
        <th scope="col">Contrato V</th>
        <th scope="col">Inspeccion V</th>
        <th scope="col">FecActualizacion</th>
        </tr>
    </thead>
    <tbody>
    `;

    let html1 =``

    for (let i = 1; i <= dealsCounter.toNumber(); i++) {
        const deal = await gunsContracts.gunBounty(i);
        const number = deal[0].toNumber();
        const vendedor = deal[1];
        const dni_vendedor = deal[2];
        const licencia_vendedor = deal[3];
        const numero_serie = deal[4]
        const comprador = deal[5];
        const dni_comprador = deal[6];
        const licencia_comprador=  deal[7];
        const FUT = deal[8];
        const contrato = deal[9];
        const inspeccion = deal[10];
        const FecActualizacion = deal[11];

        let taskElement = `
            <tr>
            <th scope="row">${number}</th>
            <td>${vendedor}</td>
            <td>${dni_vendedor}</td>
            <td>${licencia_vendedor}</td>
            <td>${numero_serie}</td>
            <td>${comprador}</td>
            <td>${dni_comprador}</td>
            <td>${licencia_comprador}</td>
            <td>${FUT}</td>
            <td>${contrato}</td>
            <td>${inspeccion}</td>
            <td>${new Date(
                FecActualizacion * 1000
              ).toLocaleString()}</td>
            </tr>
        `;
        html1 += taskElement;
      }
  
      document.querySelector("#listOfDeals").innerHTML = html+html1+`</tbody></table>`;
}

const getAccountWallet = async()=>{
    const wallet = await window.ethereum.request({
        method: 'eth_requestAccounts',
    })
    document.getElementById("wallet").innerText = "Wallet: "+ wallet[0]
}

const searchById = async(id)=>{
    try {
        const deal  = await gunsContracts.gunBounty(id);
        const number = deal[0].toNumber();
        const vendedor = deal[1];
        const dni_vendedor = deal[2];
        const licencia_vendedor = deal[3];
        const numero_serie = deal[4]
        const comprador = deal[5];
        const dni_comprador = deal[6];
        const licencia_comprador=  deal[7];
        const FUT = deal[8];
        const contrato = deal[9];
        const inspeccion = deal[10];
        const FecActualizacion = deal[11];

        let html = `        
        <table class="table mt-4 table-striped table-hover text-center">
        <thead>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Vendedor</th>
            <th scope="col">Dni V</th>
            <th scope="col">Licencia V</th>
            <th scope="col">N° Serie</th>
            <th scope="col">Comprador</th>
            <th scope="col">Dni C</th>
            <th scope="col">Licencia C</th>
            <th scope="col">FUT</th>
            <th scope="col">Contrato V</th>
            <th scope="col">Inspeccion V</th>
            <th scope="col">FecActualizacion</th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">${number}</th>
            <td>${vendedor}</td>
            <td>${dni_vendedor}</td>
            <td>${licencia_vendedor}</td>
            <td>${numero_serie}</td>
            <td>${comprador}</td>
            <td>${dni_comprador}</td>
            <td>${licencia_comprador}</td>
            <td>${FUT}</td>
            <td>${contrato}</td>
            <td>${inspeccion}</td>
            <td>${new Date(
                FecActualizacion * 1000
              ).toLocaleString()}</td>
            </tr>
        </tbody>
        </table>
        `;
        console.log(html)
        document.querySelector("#listOfDeals").innerHTML = html;
    } catch (error) {
        console.log(error)
    }
    
}

const form = document.querySelector("#search");
const inputId = document.querySelector("#inputId")

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const id = parseInt(form["inputId"].value);
    console.log(id);

    if(id == 0){
        getAllContracts();
        
    }else{
        searchById(id);
        inputId.value=0
    }
})

inputId.addEventListener("input",(event)=>{
    if(inputId.value<0){
        inputId.value = 0
    }
    if(inputId.value>maximo){
        inputId.value =maximo
    }

    console.log(maximo)
    
})


getAccount();
getAllContracts();
getAccountWallet();


console.log(Web3Provider);






