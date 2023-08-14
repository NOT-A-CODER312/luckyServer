const contractABI = require('./LuckyABI')
const { ethers } = require('ethers')
require('dotenv').config()

contractAddress = '0x2b54E520d2C16fb87BfDb62E5d0D05E565564785'

const provider = new ethers.JsonRpcProvider(
  process.env.INFURIA_SEPOLIA_ENDPOOINT
)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const LuckyToken = new ethers.Contract(contractAddress, contractABI, signer)

let cap
let owner

// console.log(contractABI,"abi")

async function getLuckyToken () {
  cap = await LuckyToken.cap()
  let totalSupply = await LuckyToken.totalSupply()
  // owner = await LuckyToken.owner()
  // const  luckyPool = await LuckyToken.luckyPoolSupply()
  // console.log(await LuckyToken.getAddress(),Number(ethers.formatEther(cap)), Number(ethers.formatEther(luckyPool)),owner)
  // const value = ethers.parseUnits("20000", 18)
  // await LuckyToken.transfer("0x8732C6A584501fecc18961A75fe5db598983582b",value)
  // await LuckyToken.transfer("0x3f63355c6B0B5DCc2855f77cA9a88da5553463a1",value)
  // const eligibleAddresses = await LuckyToken.getAllEligibleLucyPoolRewardAddresses()
  // // console.log("Eligible Addresses: ", eligibleAddresses,luckyPool )
  // let blockReward = await LuckyToken.blockReward()

  // console.log("BlockReward: ", Number(ethers.formatEther(blockReward)))
  // await LuckyToken.setBlockReward(200)
  // blockReward = await LuckyToken.blockReward()
  // console.log("BlockReward: ", Number(ethers.formatEther(blockReward)))

  let currentDate = new Date()

  // check if eligibleAddresses is more than 1
  const giftCondition = async () => {
    currentDate = new Date()
    if (
      Number(ethers.formatEther(totalSupply)) <
        Number(ethers.formatEther(cap)) &&
      currentDate.getDate() == 1
    ) {
      const eligibleAddresses =
        await LuckyToken.getAllEligibleLucyPoolRewardAddresses()
      const luckyPoolSupply = Number(
        ethers.formatEther(await LuckyToken.luckyPoolSupply())
      )

      console.log(
        'Eligible Addresses: ',
        eligibleAddresses,
        eligibleAddresses.length
      )
      let randomIndex = Math.floor(Math.random() * eligibleAddresses.length)
      const randomWinner = eligibleAddresses[randomIndex]
      delete eligibleAddresses[randomIndex]
      let randomIndex2 = Math.floor(Math.random() * eligibleAddresses.length)
      const randomWinner2 = eligibleAddresses[randomIndex2]

      console.log(
        'Winner: ',
        randomWinner,
        'Winner2: ',
        randomWinner2,
        luckyPoolSupply
      )
      const randomDecimal = Math.random()
      const randomPercentage = Math.floor(50 + randomDecimal * 50)

      const winningPercentage = luckyPoolSupply * (randomPercentage / 100)
      const secondWinnigPercentage = luckyPoolSupply - winningPercentage
      const winnngValue1 = ethers.parseUnits(winningPercentage.toString(), 18)
      const winnngValue2 = ethers.parseUnits(
        secondWinnigPercentage.toString(),
        18
      )

      console.log(
        'Random percentage: ',
        randomPercentage,
        winnngValue1,
        winnngValue2
      )

      await LuckyToken.giftRandomWinner(
        randomWinner,
        randomWinner2,
        winnngValue1,
        winnngValue2
      )
    } else if (currentDate.getDate() != 1) {
      console.log('Not the first of the month')
    }
  }
  const giftInterval = setInterval(giftCondition, 21600000)
}

module.exports = getLuckyToken
