// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract GunsContract{
    address myOwner;
    uint256 public tasksCounter = 0;

    modifier onlyOwner(){
        require(msg.sender == myOwner);
        _;
    }
    constructor(){
        tasksCounter=0;
        myOwner == msg.sender;
    }
    event GunBountyCreated(
        uint256 id,
        string comprador,
        string vendedor,
        uint numero_serie,
        uint256 createdAt
    );
    struct GunBounty{
        uint id;
        string comprador;
        string vendedor;
        uint licenciaComprador;
        uint numero_serie;
        uint createdAt;
    }
    mapping (uint => GunBounty) public gunBounty;

    //public --> pasar datos
    //view --> solo visibilidad
    function createGunBounty (string memory _vendedor,uint _dniVendedor,uint _licenciaVendedor,uint _dniComprador ,uint _licenciaComprador, 
    string memory _comprador, uint _numero_serie,string memory _state) public{
        tasksCounter++;
        bool condition= licenseValidate(_dniVendedor, _licenciaVendedor);
        bool condition2 = licenseValidate(_dniComprador, _licenciaComprador);
        bool condition3 = gunValidate(_dniVendedor, _numero_serie);
        bool condition4 = documentsValidate(_dniComprador, _dniVendedor, _state);
        if(condition && condition2){
            if(condition3){
                if(condition4){
                    gunBounty[tasksCounter] = GunBounty(tasksCounter,_comprador,_vendedor,_licenciaComprador,_numero_serie,block.timestamp);
                    emit GunBountyCreated(
                        tasksCounter,
                        _comprador,
                        _vendedor,
                        _numero_serie,
                        block.timestamp
                        );
                }else{
                    revert('ERROR : No se ha validado los documentos');
                }
            }
            else{
                revert('ERROR : El arma asociada al vendedor no es correcta');
            }
        }else{
            revert('ERROR: Validacion de licencia');
        }

    }
    
    function licenseValidate(uint _dni, uint _license) public pure returns(bool) {
        uint dni = 1; // Deberia hacerse fetch con la base de datos de SUCAMEC
        uint license = 1;
        if(_dni == dni){
            if(_license == license){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    function gunValidate(uint256 _dni,uint _gunLicense) public pure returns(bool) {
        uint dni = 1; // Deberia hacerse fetch con la base de datos de SUCAMEC
        uint gunLicense = 1;
        if(_dni == dni){
            if(_gunLicense == gunLicense){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    function documentsValidate(uint _dniComprador,uint _dniVendedor,string memory _state) public pure returns(bool){
        if(_dniComprador==1 && _dniVendedor==1){
            if(keccak256(bytes(_state)) == keccak256(bytes("S"))){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }


}