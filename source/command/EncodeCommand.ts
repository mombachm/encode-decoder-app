import { AbstractCommand } from "./Command";
import { Terminal } from "terminal-kit";
import { EncodingType, EncodingTypeIndex, EncodingTypeNamesMapping } from "../encoders/EncodingType";
import { Encoder } from "../encoders/Encoder";
import { EncoderFactory } from "../encoders/EncoderFactory";
import { FileIO } from "../io/FileIO";
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
    super.execute();
    this.showCommandTitle();
    this.showEncodingOptionsTable();
    this.showEncodingTypeSelection();
  }

  private verifyFilePath() {
    if (!this.filePath) {
      term.red("The specified file path is invalid for encoding.\n");
      term.yellow("Usage: yarn encode [FILE PATH]");
      process.exit(1);
    }
  }

  private showCommandTitle() {
    term.brightCyan(`############## Encoder ##############\n`);
  }

  private showEncodingOptionsTable() {
    term.brightCyan("\nThese are the available encoding options:\n");
    (<any>term).table( [
        [ 'Options' , 'Encoding Types' ] ,
        [ 'Golomb' , EncodingTypeIndex.Golomb ] ,
        [ 'Elias-Gamma' , EncodingTypeIndex.EliasGamma ] ,
        [ 'Fibonacci' , EncodingTypeIndex.Fibonacci] ,
        [ 'Unary' , EncodingTypeIndex.Unary ],
        [ 'Delta' , EncodingTypeIndex.Delta ]
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
    term.brightMagenta("Select a encoding type to start the encoding process:\n")
    term.inputField(
      ( error: any , input: EncodingType ) => {
          term.brightMagenta( "\nSelected encoding type: '%s'\n" ,  EncodingTypeNamesMapping[input] ) ;
          this.encodingType = EncodingTypeNamesMapping[input];
          const encoder = this.loadEncoder();
          if (!encoder) {
            term.red( "Invalid encoding type." ) ;
            term.processExit(1);
            process.exit(1);
          }
          term.brightCyan( "\nEncoding started... '%s'\n" ,  EncodingTypeNamesMapping[input] ) ;
          encoder!.encode(this.filePath);
          term.processExit(0);
      }
    );
  }

  private loadEncoder(): Encoder | null {
    const fileData = new FileIO().readFileDataForEncoding(this.filePath);
    return new EncoderFactory().make(this.encodingType, fileData);
  }
}
try {
  new EncodeCommand(process.argv).execute();
} catch(error) {
  term.red("Error during encoding.\n");
  term.processExit(1);
  process.exit(1);
}