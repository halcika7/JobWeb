export const randomString = (length = 20): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  const randomCharacters: string[] = [];

  for (let i = 0; i < length; i += 1) {
    randomCharacters.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }

  return randomCharacters.join('');
};
