export interface Encoder {
    encode(filepath: string): void
    decode(filepath: string): void
}