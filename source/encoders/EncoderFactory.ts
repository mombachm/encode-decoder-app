import { Encoder } from "./Encoder";
import { EncodingType, EncodingTypeIndex } from "./EncodingType";
import { FibonnaciEncoder } from "./FibonnaciEncoder";
import { UnaryEncoder } from "./UnaryEncoder";

export class EncoderFactory {
    make(type: EncodingType): Encoder | null {
        switch(type) {
            case EncodingTypeIndex.Fibonacci:
                return new FibonnaciEncoder();
            case EncodingTypeIndex.Unary:
                return new UnaryEncoder();
            default:
                return null;
        }
    }
}