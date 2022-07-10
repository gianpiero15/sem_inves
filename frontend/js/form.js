Web3Provider = window.ethereum;


gunsBounty = {};

gunsContracts={};

const createBounty = async (_vendedor,_dniVendedor,_licenciaVendedor,_numeroserie,_comprador,_dniComprador, _licenciaComprador, _FUT,_contrato,_inspeccion) =>{
    const resp = await fetch("GunsContract.json");
    const contracts = await resp.json();

    const wallet = await window.ethereum.request({
        method: 'eth_requestAccounts',
    })
    console.log(wallet[0])

    gunsBounty =  TruffleContract(contracts);

    gunsBounty.setProvider(Web3Provider);

    gunsContracts = await gunsBounty.deployed();

    try {
        await gunsContracts.createGunBounty(_vendedor,_dniVendedor,_licenciaVendedor,_numeroserie,_comprador,_dniComprador, _licenciaComprador, _FUT,_contrato,_inspeccion,{
            from:wallet[0],
        });

    } catch (error) {
        console.log(error)
    }

    
}

const form = document.querySelector("#form");
const futCheck = document.querySelector("#fut");
const contratoCheck = document.querySelector("#contrato");
const inspeccionCheck = document.querySelector("#inspeccion");

form.addEventListener("submit", (event) => {
    event.preventDefault()

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

    const nombreV = form["nombreV"].value;
    const dniV = parseInt(form["dniV"].value);
    const licV = parseInt(form["licV"].value);
    const nserie = parseInt(form["nserie"].value);
    const nombreC = form["nombreC"].value;
    const dniC = parseInt(form["dniC"].value);
    const licC = parseInt(form["licC"].value);
    const fut = parseInt(futCheck.value);
    const contrato = parseInt(contratoCheck.value);
    const licencia = parseInt(inspeccionCheck.value);

    console.log(typeof fut)

    createBounty(nombreV,dniV,licV,nserie,nombreC,dniC,licC,fut,contrato,licencia);


})





