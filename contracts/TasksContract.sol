// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract{
    uint256 public tasksCounter = 0;

    constructor(){
        
    }

    event TaskCreated(
        uint256 id,
        string comprador,
        string vendedor,
        string numero_serie,
        uint256 createdAt
    );

    event TaskToggledDone(uint256 id, bool done);

    struct Task{
        uint id;
        string comprador;
        string vendedor;
        string numero_serie;
        uint createdAt;
    }

    mapping (uint => Task) public tasks;

    //public --> pasar datos
    //view --> solo visibilidad
    function createTask (string memory _comprador, string memory _vendedor, string memory _numero_serie) public {
        tasksCounter++;
        tasks[tasksCounter] = Task(tasksCounter,_comprador,_vendedor,_numero_serie,block.timestamp);
        emit TaskCreated(
            tasksCounter,
            _comprador,
            _vendedor,
            _numero_serie,
            block.timestamp
        );
    }

}