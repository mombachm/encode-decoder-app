import { Encoder } from "./Encoder";
import { EncodingType, EncodingTypeIndex } from "./EncodingType";
import { FibonnaciEncoder } from "./FibonnaciEncoder";

export class EncoderFactory {
    make(type: EncodingType): Encoder | null {
        switch(type) {
            case EncodingTypeIndex.Fibonacci:
                return new FibonnaciEncoder();
            default:
                return null;
        }
    }
}