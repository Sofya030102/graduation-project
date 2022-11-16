import Web3 from "web3"
import abiArray from "./abi"

const ContractAddress = "0xEDF95F9c43dDD86a53bFbCeF66E305bFC2937B25";
const web3 = new Web3("http://127.0.0.1:8545")
const Contract = new web3.eth.Contract(abiArray, ContractAddress);

const miner  = "0x17304213E4fA3ef43C97605C5824AcE8760795f3";
const minerPassword = '123';

export const registration = async (email, FIO, password)=>{
    try{
        const accounts = await web3.eth.getAccounts();
        const newAccount = await web3.eth.personal.newAccount(password);
        console.log(newAccount);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 999999);
        await web3.eth.personal.unlockAccount(newAccount, password, 999999);
        await web3.eth.sendTransaction(
            {
                from: miner,
                to: newAccount, 
                value: 200000000000000000000
            },
            function(error, hash) {
                if (!error) console.log("#" + hash + "#");  
                else console.error(error); 
            } 
        );
        await Contract.methods.Registration(newAccount,FIO,email).send({from: accounts[0]});
        return true;
    }
    catch(e){
        return e.message;
    }
}

export const authorization = async (address, password)=>{
    try {
        await web3.eth.personal.unlockAccount(address, password, 9999);
        web3.eth.defaultAccount = address;
        return address;
    }
    catch(e) {
        alert(e);
    }
}

export const Change_avatar = async (avatar_path) => {
    try {
        const address = window.localStorage.getItem('address');
        let data = web3.eth.abi.encodeFunctionCall({
            name: 'Change_avatar',
            type: 'function',
            inputs: [{
                type: 'string',
                name: 'avatar_path'
            }]
        }, [avatar_path]);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 999999);
        await web3.eth.sendTransaction(
            {
                from: address,
                to: ContractAddress,
                value: 0,
                data: data
            },
            function(error, hash) {
                if (!error) console.log("#" + hash + "#");
                else console.error(error);
            }
        );
        return true;
    }
    catch(e) {
        return e;
    }
}

export const getUserAddress = async (email) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const login = await Contract.methods.getUserAddress(email).call({from: accounts[0]});
        return login;
    }
    catch (e) {
        return false;
    }
}

export const getUser = async (address) => {
    try{
        const accounts = await web3.eth.getAccounts();
        let user = await Contract.methods.getUser(address).call({from: accounts[0]});
        console.log(user);
        return user;
    }
    catch(e){
        return {
            "email": "",
            "login": "",
            "name": ''
        };
    }
}
export const createVoting = async (address,question, open_voting, time) => {
    try{
        let data = web3.eth.abi.encodeFunctionCall({
            name: 'New_voting',
            type: 'function',
            inputs: [{
				name: "question",
				type: "string"
			},
			{
				name: "open_voting",
				type: "bool"
			},
			{
				name: "time",
				type: "uint256"
			}]
        }, [question,open_voting,time]);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 999999);
        await web3.eth.sendTransaction(
            {
                from: address,
                to: ContractAddress, 
                value: 0,
                data: data
            },
            function(error, hash) {
                if (!error) console.log("#" + hash + "#");  
                else console.error(error); 
            } 
        );
        return true;
    }
    catch(e){
        console.log("ERROR NEW VOTING: " + e);
        return e;
    }
}

export const getVotings = async (is_open_voting, is_ec_voting, isDone, isChecked) => {
    try{
        const votings = await Contract.methods.Get_votings(is_open_voting, is_ec_voting, isDone, isChecked).call({
            from: window.localStorage.getItem('address'),
            gas: 500000
        });
        return votings;
    }
    catch(e){
        alert(e)
    }
}

export const Auditor_change = async (address, address_from) => {
    try{
        let data = web3.eth.abi.encodeFunctionCall({
            name: 'Auditor_change',
            type: 'function',
            inputs: [{
                type: 'address',
                name: 'login'
            }]
        }, [address]);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 999999);
        await web3.eth.sendTransaction(
            {
                from: address_from,
                to: ContractAddress, 
                value: 0,
                data: data
            },
            function(error, hash) {
                if (!error) console.log("#" + hash + "#");  
                else console.error(error); 
            } 
        );
        return true;
    }
    catch(e){
        console.log("ERROR AUDITOR CHANGE: " + e);
        alert(e)
        return false;
    }
}

export const Change_email = async (address,email) => {
    try {
        let data = web3.eth.abi.encodeFunctionCall({
            name: 'Change_email',
            type: 'function',
            inputs: [{
                type: 'string',
                name: 'email'
            }]
        }, [email]);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 999999);
        await web3.eth.sendTransaction(
            {
                from: address,
                to: ContractAddress, 
                value: 0,
                data: data
            },
            function(error, hash) {
                if (!error) console.log("#" + hash + "#");  
                else console.error(error); 
            } 
        );
        return true;
    } 
    catch(e) {
        return e;
    }
}

export const Change_name = async (address,name) => {
    try {
        let data = web3.eth.abi.encodeFunctionCall({
            name: 'Change_name',
            type: 'function',
            inputs: [{
                type: 'address',
                name: 'login'
            },{
                type: 'string',
                name: 'name'
            }]
        }, [address,name]);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 999999);
        await web3.eth.sendTransaction(
            {
                from: miner,
                to: ContractAddress, 
                value: 0,
                data: data
            },
            function(error, hash) {
                if (!error) console.log("#" + hash + "#");  
                else console.error(error); 
            } 
        );
        return true;
    } 
    catch(e) {
        return e;
    }
}

export const EC_change = async (address, address_from) => {
    try{
        let data = web3.eth.abi.encodeFunctionCall({
            name: 'EC_change',
            type: 'function',
            inputs: [{
                type: 'address',
                name: 'login'
            }]
        }, [address]);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 999999);
        await web3.eth.sendTransaction(
            {
                from: address_from,
                to: ContractAddress, 
                value: 0,
                data: data
            },
            function(error, hash) {
                if (!error) console.log("#" + hash + "#");  
                else console.error(error); 
            } 
        );
        return true;
    }
    catch(e){
        alert(e)
    }
}

export const EC_voting = async (question) => {
    try{
        let data = web3.eth.abi.encodeFunctionCall({
            name: 'EC_voting',
            type: 'function',
            inputs: [{
				name: "question",
				type: "string"
			}
			]
        }, [question]);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 999999);
        await web3.eth.sendTransaction(
            {
                from: window.localStorage.getItem('address'),
                to: ContractAddress, 
                value: 0,
                data: data
            },
            function(error, hash) {
                if (!error) console.log("#" + hash + "#");  
                else console.error(error); 
            } 
        );
        return true;
    }
    catch(e){
        console.log("ERROR NEW VOTING: " + e);
        return e;
    }
}

export const Get_voting_info = async (id) => {
    try{
        const Get_voting_info = await Contract.methods.Get_voting_info(id).call({
            from: window.localStorage.getItem('address'),
            gas : 500000
        });
        return Get_voting_info;
    }
    catch(e){
        alert(e)
    }
}

export const EC_check = async (id) => {
    try{
        const EC_check = await Contract.methods.EC_check(id).call({
            from: window.localStorage.getItem('address'),
            gas : 500000
        });
        return EC_check;
    }
    catch(e){
        alert(e)
    }
}

export const Get_voting_results = async (id) => {
    try{
        const Get_voting_results = await Contract.methods.Get_voting_results(id).call();
        return Get_voting_results;
    }
    catch(e){
        alert(e)
    }
}

export const Role_change = async (address, address_from) => {
    try{
        let data = web3.eth.abi.encodeFunctionCall({
            name: 'Role_change',
            type: 'function',
            inputs: [{
                type: 'address',
                name: 'login'
            }]
        }, [address]);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 999999);
        await web3.eth.sendTransaction(
            {
                from: address_from,
                to: ContractAddress, 
                value: 0,
                data: data
            },
            function(error, hash) {
                if (!error) console.log("#" + hash + "#");  
                else console.error(error); 
            } 
        );
        return true;
    }
    catch(e){
        alert(e)
    }
}

export const commit_Voting = async (id) => {
    try{
        let data = web3.eth.abi.encodeFunctionCall({
            name: 'commitVoting',
            type: 'function',
            inputs: [{
                type: 'uint256',
                name: 'id'
            }]
        }, [id]);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 999999);
        await web3.eth.sendTransaction(
            {
                from: window.localStorage.getItem('address'),
                to: ContractAddress,
                value: 0,
                data: data
            },
            function(error, hash) {
                if (!error) console.log("#" + hash + "#");
                else console.error(error);
            }
        );
        return true;
    }
    catch(e){
        return e;
    }
}

export const delete_Voting = async (id) => {
    try{
        let data = web3.eth.abi.encodeFunctionCall({
            name: 'deleteVoting',
            type: 'function',
            inputs: [{
                type: 'uint256',
                name: 'id'
            }]
        }, [id]);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 999999);
        await web3.eth.sendTransaction(
            {
                from: window.localStorage.getItem('address'),
                to: ContractAddress,
                value: 0,
                data: data
            },
            function(error, hash) {
                if (!error) console.log("#" + hash + "#");
                else console.error(error);
            }
        );
        return true;
    }
    catch(e){
        return e;
    }
}

export const Vote = async (voting, choice) => {
    try{
        let data = web3.eth.abi.encodeFunctionCall({
            name: 'Vote',
            type: 'function',
            inputs: [{
                type: 'uint256',
                name: 'voting'
            },
            {
                type: 'bool',
                name: 'choice'
            }]
        }, [voting, choice]);
        await web3.eth.personal.unlockAccount(miner, minerPassword, 999999);
        await web3.eth.sendTransaction(
            {
                from: window.localStorage.getItem('address'),
                to: ContractAddress, 
                value: 0,
                data: data
            },
            function(error, hash) {
                if (!error) console.log("#" + hash + "#");  
                else console.error(error); 
            } 
        );
        alert('Вы успешно проголосовали')
        return true;
    }
    catch(e){
        alert(e)
        return false;
    }
}

export const Votings = async (id) => {
    try{
        const Votings = await Contract.methods.Votings(id).call();
        return Votings;
    }
    catch(e){
        alert(e)
    }
}