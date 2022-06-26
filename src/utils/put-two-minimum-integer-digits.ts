export const putTwoMinimumIntegerDigits = (value: number): string {
    value.toLocaleString("pt-BR", {
        minimumIntegerDigits: 2
    })
}