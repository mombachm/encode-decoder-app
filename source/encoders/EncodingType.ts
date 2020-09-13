
export enum EncodingType {
    Fibonacci= 'Fibonacci',
    Golomb= 'Golomb',
    EliasGamma= 'Elias-Gamma',
    Unary= 'Unary',
    Delta= 'Delta'
}

export const EncodingTypeIndex = {
    [EncodingType.Fibonacci]: "1",
    [EncodingType.Golomb]: "2",
    [EncodingType.EliasGamma]: "3",
    [EncodingType.Unary]: "4",
    [EncodingType.Delta]: "5"
}

export const EncodingTypeNamesMapping = {
    [EncodingTypeIndex[EncodingType.Fibonacci]]: EncodingType.Fibonacci,
    [EncodingTypeIndex[EncodingType.Golomb]]: EncodingType.Golomb,
    [EncodingTypeIndex[EncodingType.EliasGamma]]: EncodingType.EliasGamma,
    [EncodingTypeIndex[EncodingType.Unary]]: EncodingType.Unary,
    [EncodingTypeIndex[EncodingType.Delta]]: EncodingType.Delta
}

