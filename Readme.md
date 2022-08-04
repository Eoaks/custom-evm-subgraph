#Custom subgraph in Peaq network

for the guide i followed to make this check https://medium.com/coinmonks/deploy-subgraphs-to-any-evm-aaaccc3559f

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Running](#running)
3. [Key points](#key-points)
4. [This Example](#this-example)


## Prerequisites 
You need both docker and jq, you can get them by running
```
brew install docker
brew install jq
```
or the equivalent on your OS

### Running

This subgraphs runs locally, so first we need to start our local graph by using these commands
```
cd graph-node/docker
./setup.sh
docker-compose up
```
You want to run this on a separate terminal instance to keep it alive.

Then in a different terminal 
```
cd custom-subgraph
yarn
yarn codegen
yarn createnode
yarn deploy
```
you may be asked for a version, just use any number you like

### Key points

* The main thing to learn from this repo is, to point your graph node to a custom evm you have to change the following line on docker-compose.yml
  `ethereum: 'mainnet:https://erpc.agung.peaq.network/'`
* also notice how subgraph.yaml should still point to `mainnet` not to the above


### This example 
Contract used for this example is 
```
pragma solidity ^0.8.7; 

contract PeaqyBlinders {
    mapping(address => string) public members;
    event AddedMember(address newMember, string name);
    event AddedAnother(address addedBy, address newMember, string name);

    function addMyself(string memory name) external {
        require(bytes(members[msg.sender]).length == 0, "This member already exists");
        members[msg.sender] = name;
        emit AddedMember(msg.sender, name);
    }

    function addAnother(address who, string memory name) external {
        require(bytes(members[who]).length == 0, "This member already exists");
        members[who] = name;
        emit AddedAnother(msg.sender, who, name);
    }
}
```

address: `0x449020feE5C2aB1900B5E39dB657302E2A0d8b52`

feel free to interact with it to test the subgraph or use your own