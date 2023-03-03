export class TxnObject {
  private txnHash: string = '';
  private index: number = 0;


  public getTxnHash(): string{
    return this.txnHash
  }

  public getIndex(): number{
    return this.index
  }

  public setTxnHash(txn: string){
    this.txnHash = txn
  }

  public setIndex(index: number){
    this.index = index
  }

}
