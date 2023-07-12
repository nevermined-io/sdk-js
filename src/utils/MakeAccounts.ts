import { ethers } from 'ethers'

export function makeAccounts(seedphrase: string): ethers.Wallet[] {
  const node = ethers.HDNodeWallet.fromPhrase(seedphrase)
  const accounts: ethers.Wallet[] = []
  for (let i = 0; i < 10; i++) {
    const acc = node.derivePath("m/44'/60'/0'/0/" + i)
    const wallet = new ethers.Wallet(acc.privateKey)
    accounts.push(wallet)
  }
  return accounts
}
