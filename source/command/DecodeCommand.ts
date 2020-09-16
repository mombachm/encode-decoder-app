import { AbstractCommand } from "./Command";
import { Terminal } from "terminal-kit";
import { EncodingType, EncodingTypeNamesMapping } from "../encoders/EncodingType";
import { Encoder } from "../encoders/Encoder";
import { EncoderFactory } from "../encoders/EncoderFactory";
import { UnaryEncoder } from "../encoders/UnaryEncoder";
import { FibonnaciEncoder } from "../encoders/FibonnaciEncoder";
import { FileIO, HeaderConfigs } from "../io/FileIO";

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
    if (!encoder) {
      term.red( "Invalid encoding type." ) ;
      term.processExit(1);
      process.exit(1);
    }
    encoder!.decode(this.filePath);
    term.green("File decoded with success.\n");
    term.processExit(0);
  }

  private verifyFilePath() {
    if (!this.filePath) {
      term.red("The specified file path is invalid for decoding.\n");
      term.yellow("Usage: yarn decode [FILE PATH]");
      process.exit(1);
    }
  }

  private loadEncoder(): Encoder | null {
    const fileIO = new FileIO();
    const fileData = fileIO.readFileDataForDecoding(this.filePath);
    const headerConfigs: HeaderConfigs = fileIO.getHeaderConfigs();
    if (!headerConfigs.encodingType) {
      term.red( "Invalid header configuration." ) ;
      term.processExit(1);
      process.exit(1);
    }
    this.encodingType = headerConfigs!.encodingType;
    term.green( "\nFile encoding type: '%s'\n" ,  this.encodingType );
    term.green( "\nDecoding started...\n" ) ;
    return new EncoderFactory().make(this.encodingType, fileData);
  }

}
new DecodeCommand(process.argv).execute();