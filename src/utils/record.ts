import { Account, Claimed, VestingSchedule } from "../types"

export const getAccount = async (address: string) => {
  const _account = await Account.get(address);
  if (!_account) {
    const newAccount = new Account(address);
    newAccount.address = address;
    newAccount.claimed = BigInt(0);
    newAccount.total = BigInt(0);
    await newAccount.save();
    return newAccount;
  } else {
    return _account;
  }
}

export const getVestingSchedule = async (id: string) => {
  const _vestingSchedule = await VestingSchedule.get(id);
  if (!_vestingSchedule) {
    const newVestingSchedule = new VestingSchedule(id);
    newVestingSchedule.accountId = '';
    newVestingSchedule.perPeriod = BigInt(0);
    newVestingSchedule.period = BigInt(0);
    newVestingSchedule.periodCount = BigInt(0);
    newVestingSchedule.start = BigInt(0);
    newVestingSchedule.from = 1;
    return newVestingSchedule;
  } else {
    return _vestingSchedule;
  }
}

export const getClaimed = async (id: string) => {
  const _claimed = await Claimed.get(id);
  if (!_claimed) {
    const newClaimed = new Claimed(id);
    newClaimed.accountId = '';
    newClaimed.amount = BigInt(0);
    return newClaimed;
  } else {
    return _claimed;
  }
}
