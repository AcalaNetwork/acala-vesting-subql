import { SubstrateEvent } from "@subql/types";
import { getAccount, getClaimed, getVesting, getVestingSchedule } from "../utils/record";

export async function handleClaimed(event: SubstrateEvent): Promise<void> {
	const [owner, _amount] = event.event.data;
	const ownerId = owner.toString();
	const amount = _amount.toString();

	const account = await getAccount(ownerId);
	const id = `${event.block.block.header.number.toString()}-${event.event.index.toString()}`;
	const claimed = await getClaimed(id);
	claimed.accountId = account.address;
	claimed.amount = BigInt(amount);

	const vesting = await getVesting(ownerId);
	vesting.claimed += BigInt(amount);

	await claimed.save();
	await vesting.save();
}

export async function handleAdded(event: SubstrateEvent): Promise<void> {
	const [_, owner, data] = event.event.data;

	const ownerId = owner.toString();
	const perPeriod = (data as any)['perPeriod'].toString();
	const periodCount = (data as any)['periodCount'].toString();
	const period = (data as any)['period'].toString();
	const start = (data as any)['start'].toString();

	const account = await getAccount(ownerId);
	const id = `${event.block.block.header.number.toString()}-${event.event.index.toString()}`;
	const vestingSchedule = await getVestingSchedule(id);
	vestingSchedule.accountId = account.address;
	vestingSchedule.perPeriod = BigInt(perPeriod);
	vestingSchedule.period = BigInt(period);
	vestingSchedule.periodCount = BigInt(periodCount);
	vestingSchedule.start = BigInt(start);
	vestingSchedule.from = 1;

	const vesting = await getVesting(ownerId);
	vesting.total += BigInt(vestingSchedule.perPeriod * vestingSchedule.periodCount);

	await vestingSchedule.save();
	await vesting.save();
}

interface DataProps { start: number, period: number, periodCount: number, perPeriod: number };

export async function handleUpdated(event: SubstrateEvent): Promise<void> {
	const [owner] = event.event.data;

	const ownerId = owner.toString();
	const account = await getAccount(ownerId);
	const id = `${event.block.block.header.number.toString()}-${event.event.index.toString()}`;

	let total = BigInt(0);

	const data = await api.query.vesting.vestingSchedules(owner);
	await Promise.all((data as unknown as DataProps[]).map(async (item, index) => {
		const vestingSchedule = await getVestingSchedule(`${id}-${index}`);
		vestingSchedule.accountId = account.address;
		vestingSchedule.perPeriod = BigInt(item.perPeriod.toString());
		vestingSchedule.period = BigInt(item.period.toString());
		vestingSchedule.periodCount = BigInt(item.periodCount.toString());
		vestingSchedule.start = BigInt(item.start.toString());
		vestingSchedule.from = 2;

		total += BigInt(item.perPeriod.toString()) * BigInt(item.periodCount.toString());

		await vestingSchedule.save();
	}));

	const vesting = await getVesting(ownerId);
	vesting.claimed = BigInt(total);

	await vesting.save();
};
