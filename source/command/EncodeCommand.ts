import { AbstractCommand } from "./Command";
import { Terminal } from "terminal-kit";
import { EncodingType, EncodingTypeNamesMapping } from "../encoders/EncodingType";
import { Encoder } from "../encoders/Encoder";
import { EncoderFactory } from "../encoders/EncoderFactory";
const term: Terminal = require( 'terminal-kit' ).terminal;

export class EncodeCommand extends AbstractCommand {
  private filePath: string;
  private encodingType: EncodingType;

  constructor(commandArguments: string[]) {
    super(commandArguments);
    this.filePath = this.arguments[0];
    this.verifyFilePath();
  }

  public execute(): void {
    this.showEncodingOptionsTable();
    this.showEncodingTypeSelection();
  }

  private verifyFilePath() {
    if (!this.filePath) {
      console.log("aqui");
      term.red("The specified file path is invalid for encoding.\n");
      term.yellow("Usage: yarn encode [FILE PATH]");
      process.exit(1);
    }
  }

  private showEncodingOptionsTable() {
    term.green("These are the available encoding options:\n");
    (<any>term).table( [
        [ 'Options' , 'Encoding Types' ] ,
        [ 'Fibonacci' , '1'] ,
        [ 'Golomb' , '2' ] ,
        [ 'Elias-Gamma' , '3' ] ,
        [ 'Unária' , '4' ],
        [ 'Delta' , '5' ]
      ] , {
          hasBorder: true ,
          contentHasMarkup: true ,
          textAttr: { bgColor: 'default' } ,
          width: 60 ,
          fit: true   // Activate all expand/shrink + wordWrap
      }
    );
  }

  private showEncodingTypeSelection() {
    term.yellow("Select a encoding type to start the encoding process:\n")
    term.inputField(
      ( error: any , input: EncodingType ) => {
          term.green( "\nSelected encoding type: '%s'\n" ,  EncodingTypeNamesMapping[input] ) ;
          this.encodingType = input;
          const encoder = this.loadEncoder();
          if (!encoder) {
            term.red( "Invalid encoding type." ) ;
            term.processExit(1);
            process.exit(1);
          }
          encoder!.encode(this.filePath);
          term.processExit(0);
      }
    );
  }

  private loadEncoder(): Encoder | null {
    return new EncoderFactory().make(this.encodingType);
  }
}
new EncodeCommand(process.argv).execute();