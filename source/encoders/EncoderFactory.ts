import { HeaderConfigs } from "source/io/FileIO";
import { DeltaEncoder } from "./DeltaEncoder";
import { EliasGammaEncoder } from "./EliasGammaEncoder";
import { Encoder } from "./Encoder";
import { EncodingType } from "./EncodingType";
import { FibonnaciEncoder } from "./FibonnaciEncoder";
import { GolombEncoder } from "./GolombEncoder";
import { UnaryEncoder } from "./UnaryEncoder";

export class EncoderFactory {
    make(headerConfigs: HeaderConfigs, inputData: string[]): Encoder | null {
        switch(headerConfigs.encodingType) {
            case EncodingType.Fibonacci:
                return new FibonnaciEncoder(inputData);
            case EncodingType.Unary:
                return new UnaryEncoder(inputData);
            case EncodingType.Golomb:
                return new GolombEncoder(inputData, headerConfigs.divider);
            case EncodingType.Delta:
                return new DeltaEncoder(inputData);
            case EncodingType.EliasGamma:
                return new EliasGammaEncoder(inputData);
            default:
                return null;
        }
    }
}