import { AbstractCommand } from "./Command";
import { Terminal } from "terminal-kit";
import { EncodingType, EncodingTypeNamesMapping } from "../encoders/EncodingType";
import { FibonnaciEncoder } from "../encoders/FibonnaciEncoder";
import { Encoder } from "../encoders/Encoder";
const term: Terminal = require( 'terminal-kit' ).terminal;

export class DecodeCommand extends AbstractCommand {
  private filePath: string;
  private encodingType: EncodingType;

  constructor(commandArguments: string[]) {
    super(commandArguments);
    this.filePath = this.arguments[0];
    this.verifyFilePath();
  }

  public execute(): void {
    const encoder = this.loadEncoder();
    encoder.decode(this.filePath);
    term.green("File decoded with success.\n");
    term.processExit(0);
  }

  private verifyFilePath() {
    if (!this.filePath) {
      console.log("aqui");
      term.red("The specified file path is invalid for decoding.\n");
      term.yellow("Usage: yarn decode [FILE PATH]");
      process.exit(1);
    }
  }

  private loadEncoder(): Encoder {
    return new FibonnaciEncoder();
  }
}
new DecodeCommand(process.argv).execute();