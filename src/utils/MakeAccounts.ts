import { Mnemonic, ethers, getIndexedAccountPath } from 'ethers'

export function makeAccounts(seedphrase: string): ethers.Wallet[] {
  const mnemonic = Mnemonic.fromPhrase(seedphrase)
  const node = ethers.HDNodeWallet.fromSeed(mnemonic.computeSeed())
  const accounts: ethers.Wallet[] = []

  for (let i = 0; i < 10; i++) {
    const acc = node.derivePath(getIndexedAccountPath(i))
    const wallet = new ethers.Wallet(acc.privateKey)
    accounts.push(wallet)
  }
  return accounts
}
