// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Student {
    _Student[] public students;

    struct _Student {
        string qrCode;
        address owner;
    }
    function getStudents() public view returns (_Student[] memory) {
        return students;
    }

    function create(
        string calldata _qrCode
    ) external {
        _Student memory newStudent = _Student({
            qrCode: _qrCode,
            owner: msg.sender
        });
        students.push(newStudent);
    }
}
