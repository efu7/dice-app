export function tokenize(command: string): string[] {
  command = command.replace(/\s+/g, "");

  const tokens: string[] = [];

  let current = "";

  for (let i = 0; i < command.length; i++) {
    const c = command[i];

    if ((c === "+" || c === "-") && current !== "") {
      tokens.push(current);
      current = c;
    } else {
      current += c;
    }
  }

  if (current !== "") {
    tokens.push(current);
  }

  return tokens;
}