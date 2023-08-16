document.addEventListener("DOMContentLoaded", async () => {
    const contractAddress = "0xBFc47De2325a7D6cb65E7449c90646b04bcbe351"; // Replace with your contract address
    const abi = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "contribute",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_goal",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "GoalReached",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "contributions",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "goal",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "raisedAmount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]; // Replace with your contract's ABI

    let web3;

    if (window.ethereum) {
        web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
        } catch (error) {
            // User denied account access
            console.error("User denied account access");
        }
    } else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
    } else {
        console.error("No Ethereum provider detected");
    }

    const contract = new web3.eth.Contract(abi, contractAddress);

    const goalElement = document.getElementById("goal");
    const raisedElement = document.getElementById("raised");
    const contributeBtn = document.getElementById("contributeBtn");
    const contributionAmountInput = document.getElementById("contributionAmount");

    const goal = await contract.methods.goal().call();
    const raised = await contract.methods.raisedAmount().call();

    goalElement.textContent = web3.utils.fromWei(goal, "ether");
    raisedElement.textContent = web3.utils.fromWei(raised, "ether");

    contributeBtn.addEventListener("click", async () => {
        const contributionAmount = contributionAmountInput.value;
        if (!contributionAmount) {
            return;
        }

        const weiAmount = web3.utils.toWei(contributionAmount, "ether");
        try {
            const accounts = await web3.eth.getAccounts();
            await contract.methods.contribute(weiAmount).send({ from: accounts[0], value: weiAmount });
            location.reload();
        } catch (error) {
            console.error("Error contributing:", error);
        }
    });
});
