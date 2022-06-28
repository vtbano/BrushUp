const generateSecrets = (email) => {
  const AlphaNumericString =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";

  const secretLength = [...Array(10)];
  const newSecret = secretLength.map(
    (emptyValue) =>
      (emptyValue =
        AlphaNumericString[
          Math.floor([Math.random() * AlphaNumericString.length])
        ])
  );
  const newSecretToOneString = newSecret.join("");
  return newSecretToOneString;
};

module.exports = { generateSecrets };
