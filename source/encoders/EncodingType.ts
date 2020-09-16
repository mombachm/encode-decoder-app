
export enum EncodingType {
    Fibonacci= 'Fibonacci',
    Golomb= 'Golomb',
    EliasGamma= 'EliasGamma',
    Unary= 'Unary',
    Delta= 'Delta'
}

export const EncodingTypeIndex = {
    [EncodingType.Golomb]: "0",
    [EncodingType.EliasGamma]: "1",
    [EncodingType.Fibonacci]: "2",
    [EncodingType.Unary]: "3",
    [EncodingType.Delta]: "4"
}

export const EncodingTypeNamesMapping = {
    [EncodingTypeIndex[EncodingType.Fibonacci]]: EncodingType.Fibonacci,
    [EncodingTypeIndex[EncodingType.Golomb]]: EncodingType.Golomb,
    [EncodingTypeIndex[EncodingType.EliasGamma]]: EncodingType.EliasGamma,
    [EncodingTypeIndex[EncodingType.Unary]]: EncodingType.Unary,
    [EncodingTypeIndex[EncodingType.Delta]]: EncodingType.Delta
}

