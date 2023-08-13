const contractABI = require("./LuckyABI")
const { ethers } = require("ethers");
require("dotenv").config()

contractAddress = "0x62c75210Ce2a86a9c2261fbEb9711f41E2649991"


const provider = new ethers.JsonRpcProvider(process.env.INFURIA_SEPOLIA_ENDPOOINT)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY,provider)
const LuckyToken = new ethers.Contract(contractAddress,contractABI,signer)


let cap;
let owner;

// console.log(contractABI,"abi")

async function getLuckyToken(){
    cap = await LuckyToken.cap()
    owner = await LuckyToken.owner()
    const  luckyPool = await LuckyToken.luckyPoolSupply()
    console.log(await LuckyToken.getAddress(),Number(ethers.formatEther(cap)), Number(ethers.formatEther(luckyPool)),owner)
    const value = ethers.parseUnits("200", 18)
    // LuckyToken.transfer("0x3f63355c6B0B5DCc2855f77cA9a88da5553463a1",value)
    const eligibleAddresses = await LuckyToken.getAllEligibleLucyPoolRewardAddresses()
    // console.log("Eligible Addresses: ", eligibleAddresses,luckyPool )
    let blockReward = await LuckyToken.blockReward()

    console.log("BlockReward: ", Number(ethers.formatEther(blockReward)))
    await LuckyToken.setBlockReward(200)
    blockReward = await LuckyToken.blockReward()
    console.log("BlockReward: ", Number(ethers.formatEther(blockReward)))
    


}

module.exports = getLuckyToken;