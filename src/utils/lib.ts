export const shortAddress = (address: string) => {
  return (
    address.substring(0, 7) + "..." + address.substring(address.length - 5)
  );
};