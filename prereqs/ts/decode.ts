// decode.ts
import { Connection, PublicKey } from "@solana/web3.js";
import * as borsh from "@coral-xyz/borsh";

const connection = new Connection("https://api.devnet.solana.com");

// Define the account structure based on the IDL
class ApplicationAccount {
  user: PublicKey;
  bump: number;
  preReqTs: boolean;
  preReqRs: boolean;
  github: string;

  constructor(fields: any) {
    this.user = new PublicKey(fields.user);
    this.bump = fields.bump;
    this.preReqTs = fields.preReqTs;
    this.preReqRs = fields.preReqRs;
    this.github = fields.github;
  }
}

// Borsh schema
const schema = new Map([
  [ApplicationAccount, {
    kind: 'struct',
    fields: [
      ['user', [32]], // 32 bytes for pubkey
      ['bump', 'u8'],
      ['preReqTs', 'bool'],
      ['preReqRs', 'bool'],
      ['github', 'string'],
    ]
  }]
]);

(async () => {
  const accountInfo = await connection.getAccountInfo(
    new PublicKey("8zY1fxHgRYHhhfaLqHb7jpG3x1sktebVBQmUf5E5soeW")
  );
  
  if (accountInfo) {
    // Skip the 8-byte discriminator
    const data = accountInfo.data.slice(8);
    
    // Manual decode
    const user = new PublicKey(data.slice(0, 32));
    const bump = data[32];
    const preReqTs = data[33] === 1;
    const preReqRs = data[34] === 1;
    
    // String starts at byte 35
    const githubLength = data.readUInt32LE(35);
    const github = data.slice(39, 39 + githubLength).toString();
    
    console.log("Your enrollment data:");
    console.log("User:", user.toString());
    console.log("GitHub:", github);
    console.log("TS Completed:", preReqTs);
    console.log("RS Completed:", preReqRs);
  }
})();