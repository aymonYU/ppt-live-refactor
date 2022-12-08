enum TokenTypes {
    Punctuator = "Punctuator",
    Numeric = "Numeric",
    Identifier = "Identifier",
    Keyword = "Keyword"
  }
  interface TokenItemType {
    type: keyof typeof TokenTypes;
    value: string;
  }
  const token: Array<TokenItemType> = [];
  const keyWorlds = ["function", "return", "let", "const"];
  const puncWorlds = [",", "(", ")", "+", "=", "{", "}"];
  function tokenizer(str: string) {
    let index = 0;
    while (str[index]) {
      let s = str[index];
  
      if (puncWorlds.indexOf(s) !== -1) {
        token.push({
          type: TokenTypes.Punctuator,
          value: s
        });
        index++;
        continue;
      }
  
      if (/[0-9]/.test(s)) {
        let v = "";
        while (/[0-9]/.test(str[index])) {
          v = v + str[index];
          index++;
        }
        token.push({
          type: TokenTypes.Numeric,
          value: v
        });
        continue;
      }
  
      if (/[a-z]/.test(s)) {
        let v = "";
        while (/[a-z]/.test(str[index])) {
          v = v + str[index];
          index++;
        }
        if (keyWorlds.indexOf(v) !== -1) {
          token.push({
            type: TokenTypes.Keyword,
            value: v
          });
        } else {
          token.push({
            type: TokenTypes.Identifier,
            value: v
          });
        }
  
        continue;
      }
  
      index++;
    }
    return token;
  }
  
  const r = tokenizer(`
      
  function main(a, b){
      return a + b 
  }
  `);
  console.log(
    JSON.stringify(r) ===
      JSON.stringify([
        {
          type: "Keyword",
          value: "function"
        },
        {
          type: "Identifier",
          value: "main"
        },
        {
          type: "Punctuator",
          value: "("
        },
        {
          type: "Identifier",
          value: "a"
        },
        {
          type: "Punctuator",
          value: ","
        },
        {
          type: "Identifier",
          value: "b"
        },
        {
          type: "Punctuator",
          value: ")"
        },
        {
          type: "Punctuator",
          value: "{"
        },
        {
          type: "Keyword",
          value: "return"
        },
        {
          type: "Identifier",
          value: "a"
        },
        {
          type: "Punctuator",
          value: "+"
        },
        {
          type: "Identifier",
          value: "b"
        },
        {
          type: "Punctuator",
          value: "}"
        }
      ])
  );
  