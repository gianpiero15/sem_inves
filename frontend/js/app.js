
Web3Provider = window.ethereum;

gunsBounty = {};

gunsContracts={};

let maximo = 0;

let btnId=0;

let vendedor_1 = "";
let dni_vendedor_1 = 0;
let licencia_vendedor_1 = 0;
let numero_serie_1 =0;
let comprador_1 = "";
let dni_comprador_1 = 0;
let licencia_comprador_1=  0;
let FUT_1 = 0;
let contrato_1 = 0;
let inspeccion_1 = 0;



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
        <th scope="col">Contrato</th>
        <th scope="col">Inspeccion</th>
        <th scope="col">Fecha</th>
        <th scope="col">Actualizar</th>
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
              ).toLocaleString('en-GB',{year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</td>
            <td>
                <button id=${number}btn type="button" class="btn btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><img src="./images/edit_2.png" alt="edit" class="h-25"/></button>
            </td>
              

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
            <th scope="col">Actualizar</th>
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
                ).toLocaleString('en-GB',{year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</td>
            <td>
              <button id=${number} type="button" class="btn btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><img src="./images/edit_2.png" alt="edit" class="h-25"/></button>
            </td>
            </tr>

        </tbody>
        </table>
        `;

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
    
});

getAccount();
getAllContracts();
getAccountWallet();

$(function() {
    $(document).on('click', 'button[type="button"]',async function(event) {
       btnId = parseInt(this.id);
       const deal  = await gunsContracts.gunBounty(btnId);
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

       let html = `
       <div>
        <p>Id: ${number}</p>
        <p>Nombre vendedor: ${vendedor}</p>
        <p>Dni vendedor: ${dni_vendedor}</p>
        <p>Licencia vendedor: ${licencia_vendedor}</p>
        <p>Numero de serie: ${numero_serie}</p>
        <p>Nombre comprador: ${comprador}</p>
        <p>Dni comprador: ${dni_comprador}</p>
        <p>Licencia comprador: ${licencia_comprador}</p>
        <div class="row mt-2">
        <div class="form-check container-md mt-2 col d-flex justify-content-center">
            <input class="form-check-input" type="checkbox" value="${FUT}" id="fut">
            <label class="form-check-label ps-3">
              FUT
            </label>
          </div>
          <div class="form-check container-md mt-2 col d-flex justify-content-center">
            <input class="form-check-input" type="checkbox" value="${contrato}" id="contrato">
            <label class="form-check-label ps-3">
              Contrato
            </label>
          </div>
          <div class="form-check container-md mt-2 col d-flex justify-content-center">
            <input class="form-check-input" type="checkbox" value="${inspeccion}" id="inspeccion">
            <label class="form-check-label ps-3">
              Inspeccion
            </label>
          </div>
    </div>
       </div>
       
       `
       const datos_body = document.querySelector("#datos_body")
       datos_body.innerHTML = html;

       const futCheck = document.querySelector("#fut");
       const contratoCheck = document.querySelector("#contrato");
       const inspeccionCheck = document.querySelector("#inspeccion");

       if(futCheck.value == 1){
        futCheck.checked=true
        futCheck.disabled=true
       }

       if(contratoCheck.value == 1){
        contratoCheck.checked=true
        contratoCheck.disabled=true
       }

       if(inspeccionCheck.value == 1){
        inspeccionCheck.checked=true
        inspeccionCheck.disabled=true
       }
       
       vendedor_1 = parseInt(vendedor.toString());
       dni_vendedor_1 = parseInt(dni_vendedor);
       licencia_vendedor_1 = parseInt(licencia_vendedor);
       numero_serie_1 =parseInt(numero_serie);
       comprador_1 = parseInt(comprador.toString());
       dni_comprador_1 = parseInt(dni_comprador);
       licencia_comprador_1 =  parseInt(licencia_comprador);
       FUT_1 = parseInt(FUT);
       contrato_1 = parseInt(contrato);
       inspeccion_1 = parseInt(inspeccion);

     });
   }
);

const btnLua  = document.querySelector("#actualizarBC")

btnLua.addEventListener("click",async (event)=>{
    const futCheck = document.querySelector("#fut");
    const contratoCheck = document.querySelector("#contrato");
    const inspeccionCheck = document.querySelector("#inspeccion");

    if(futCheck.checked==true){
        futCheck.value = 1
    }else{
        futCheck.value = 0
    }
    if(contratoCheck.checked==true){
        contratoCheck.value = 1
    }else{
        contratoCheck.value = 0
    }
    if(inspeccionCheck.checked==true){
        inspeccionCheck.value = 1
    }else{
        inspeccionCheck.value = 0
    }

    FUT_1 = parseInt(futCheck.value);
    contrato_1 = parseInt(contratoCheck.value);
    inspeccion_1 = parseInt(inspeccionCheck.value);
    console.log(FUT_1)
    await gunsContracts.createGunBounty();



})

console.log(Web3Provider);






