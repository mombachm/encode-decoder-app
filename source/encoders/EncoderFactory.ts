import { Encoder } from "./Encoder";
import { EncodingType } from "./EncodingType";
import { FibonnaciEncoder } from "./FibonnaciEncoder";

export class EncoderFactory {
    make(type: EncodingType): Encoder | null {
        switch(type) {
            case EncodingType.Fibonacci:
                return new FibonnaciEncoder();
            default:
                return null;
        }
    }
}