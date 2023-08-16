## Crowdfunding Smart Contract

This is a simple Ethereum smart contract written in Solidity for managing a crowdfunding campaign. The contract allows individuals to contribute Ether (ETH) towards a specified funding goal. Once the goal is reached, the owner of the contract can withdraw the raised funds. Below is a breakdown of the contract's functionality and usage.

**Contract Details**

**Name:** Crowdfunding
**Solidity Version:** 0.8.0
**License:** MIT

# Contract Features

**Constructor:** Initializes the contract with the crowdfunding goal set by the creator.

**Receive Function:** The contract implements a receive function that allows anyone to send ETH to the contract. The received ETH is automatically contributed to the campaign using the contribute function.

**Contribution Function:** Allows contributors to send a specific amount of ETH to the campaign. Contributions are tracked in the contributions mapping, and the total raised amount is updated accordingly.

**Goal Check:** The contribute function ensures that the crowdfunding goal hasn't been reached before allowing contributions. If the goal has already been reached, further contributions are rejected.

**Contribution Capping:** If a contributor sends an amount greater than the remaining required amount to reach the goal, their contribution is capped to match the remaining required amount.

**Withdraw Function:** Only the owner of the contract can withdraw the raised funds once the crowdfunding goal is reached. The total raised amount is transferred to the owner's address.

**Goal Reached Event:** An event named GoalReached is emitted when the crowdfunding goal is reached. This event can be listened to on the blockchain to track when the goal has been achieved.

## Usage

**Deploy the Contract:** Deploy the smart contract on the Ethereum blockchain, providing the desired funding goal as a parameter.

**Contributions:** Anyone can contribute to the campaign by sending ETH to the contract's address. This can be done either by calling the contribute function with a specific amount or simply by sending ETH directly to the contract. The receive function will automatically call the contribute function for any incoming ETH.

**Goal Check:** Contributions are only accepted if the crowdfunding goal has not been reached yet. Once the goal is reached, no further contributions are allowed.

**Withdrawal:** Once the goal is reached, the owner of the contract can call the withdraw function to transfer the raised funds to their address.

**Event Listening:** Users can listen for the GoalReached event on the blockchain to be notified when the goal is reached.

## Example : 

1. Deploy the contract with a goal of 100 ETH via remix IDE or Hardhat.
2. Contributors send various amounts of ETH to the contract.
3. When the total raised amount reaches or exceeds 100 ETH, the GoalReached event is emitted.
4. The contract owner can then call the withdraw function to retrieve the raised funds.

