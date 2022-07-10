// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract GunsContract{
    address myOwner;
    uint public dealsCounter = 0;

    modifier onlyOwner(){
        require(msg.sender == myOwner);
        _;
    }
    constructor(){
        myOwner == msg.sender;
    }

    struct GunBounty{
        uint id;
        string vendedor;
        uint dniVendedor;
        uint licenciaVendedor;
        string comprador;
        uint dniComprador;
        uint licenciaComprador;
        uint FUT;
        uint contrato;
        uint inspeccion;
        uint fecActualizacion;
    }

    event GunBountyCreated(
        uint id,
        string vendedor,
        uint dniVendedor,
        uint licenciaVendedor,
        string comprador,
        uint dniComprador,
        uint licenciaComprador,
        uint FUT,
        uint contrato,
        uint inspeccion,
        uint fecActualizacion
    );

    mapping (uint => GunBounty) public gunBounty;

    //public --> pasar datos
    //view --> solo visibilidad
    function createGunBounty (string memory _vendedor,uint _dniVendedor,uint _licenciaVendedor,string memory _comprador,uint _dniComprador, uint _licenciaComprador, uint _FUT,uint _contrato,uint _inspeccion) public{
        dealsCounter++;
        gunBounty[dealsCounter] = GunBounty(dealsCounter,_vendedor,_dniVendedor,_licenciaVendedor,_comprador,_dniComprador,_licenciaComprador,_FUT,_contrato,_inspeccion,block.timestamp);
        emit GunBountyCreated(
            dealsCounter,
            _vendedor,
            _dniVendedor,
            _licenciaVendedor,
            _comprador,
            _dniComprador,
            _licenciaComprador,
            _FUT,
            _contrato,
            _inspeccion,
            block.timestamp
        );
    }




}