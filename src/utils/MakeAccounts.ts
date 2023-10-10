import { Mnemonic, ethers, getIndexedAccountPath } from 'ethers'

export function makeAccounts(seedphrase: string, numAccounts = 10): ethers.Wallet[] {
  const mnemonic = Mnemonic.fromPhrase(seedphrase)
  const node = ethers.HDNodeWallet.fromSeed(mnemonic.computeSeed())
  const accounts: ethers.Wallet[] = []

  for (let i = 0; i < numAccounts; i++) {
    const acc = node.derivePath(getIndexedAccountPath(i))
    const wallet = new ethers.Wallet(acc.privateKey)
    accounts.push(wallet)
  }
  return accounts
}

export function makeAccount(seedphrase: string, accountIndex: number = 0): ethers.Wallet {
  const mnemonic = Mnemonic.fromPhrase(seedphrase)
  const node = ethers.HDNodeWallet.fromSeed(mnemonic.computeSeed())

  const acc = node.derivePath(getIndexedAccountPath(accountIndex))
  return new ethers.Wallet(acc.privateKey)
}
