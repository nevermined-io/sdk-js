import { HDNodeWallet, Mnemonic, ethers, getIndexedAccountPath } from 'ethers'

export function makeAccounts(seedphrase: string, numAccounts = 10): ethers.Wallet[] {
  const mnemonic = Mnemonic.fromPhrase(seedphrase)
  const node = ethers.HDNodeWallet.fromSeed(mnemonic.computeSeed())
  return getAccountsFromWallets(node, numAccounts)
}

export function makeAccount(seedphrase: string, accountIndex: number = 0): ethers.Wallet {
  const mnemonic = Mnemonic.fromPhrase(seedphrase)
  const node = ethers.HDNodeWallet.fromSeed(mnemonic.computeSeed())

  const acc = node.derivePath(getIndexedAccountPath(accountIndex))
  return new ethers.Wallet(acc.privateKey)
}

export function makeRandomAccounts(numAccounts = 10): ethers.Wallet[] {
  const node = ethers.Wallet.createRandom()
  return getAccountsFromWallets(node, numAccounts)
}

function getAccountsFromWallets(node: HDNodeWallet, numAccounts: number): ethers.Wallet[] {
  const accounts: ethers.Wallet[] = []

  for (let i = 0; i < numAccounts; i++) {
    // console.log(`Creating account ${i}`)
    const acc = node.derivePath(getIndexedAccountPath(i))
    const wallet = new ethers.Wallet(acc.privateKey)
    accounts.push(wallet)
  }
  return accounts
}
