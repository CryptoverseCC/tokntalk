import { BN } from 'web3-utils';

export const MAX_VALUE_256 = new BN(2)
  .pow(new BN(256))
  .subn(1)
  .toString(10);

export const fromWeiToString = (wei, decimals, decimalFigures = 3) => {
  const counter = new BN(typeof wei === 'number' ? wei.toFixed(0) : wei);

  if (counter.eqn(0)) {
    return '0';
  }

  const divider = new BN(10).pow(new BN(decimals));
  const div = new BN(counter).div(divider).toString(10);
  const mod = new BN(counter)
    .mod(divider)
    .toString(10, decimals)
    .slice(0, decimalFigures);

  return `${div}.${mod}`;
};

export const toWei = (amout, decimals) => {
  const parsedDecimals =
    typeof decimals !== 'number'
      ? parseInt(decimals, 10) // ToDo check this casting
      : decimals;
  const multiplier = new BN(10).pow(new BN(parsedDecimals));
  const [integral, rawFraction = ''] = amout.toString().split('.');
  const fraction = rawFraction.padEnd(parsedDecimals, '0').slice(0, parsedDecimals);

  return new BN(integral)
    .mul(multiplier)
    .add(new BN(fraction))
    .toString(10);
};
