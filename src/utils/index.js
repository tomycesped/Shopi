/**
 * This function calculates total price of a new order
 * @param {Array} products cartProducts : Array of Objects
 * @returns {number} total price
 */

export const totalPrice = (products) => {
    let sum = 0
    products.forEach(product => sum += product.price)
    return sum
}