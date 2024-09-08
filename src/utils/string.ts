export const truncateAddress = (address: string = '', startLength: number, endLength: number) => {
  if (address.length <= startLength + endLength) {
    return address;
  }
  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
};
