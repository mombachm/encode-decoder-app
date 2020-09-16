import { Encoder } from "./Encoder";
import { EncodingType } from "./EncodingType";
import { FibonnaciEncoder } from "./FibonnaciEncoder";
import { UnaryEncoder } from "./UnaryEncoder";

export class EncoderFactory {
    make(type: EncodingType, inputData: string[]): Encoder | null {
        switch(type) {
            case EncodingType.Fibonacci:
                return new FibonnaciEncoder(inputData);
            case EncodingType.Unary:
                return new UnaryEncoder(inputData);
            default:
                return null;
        }
    }
}