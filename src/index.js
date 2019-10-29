class ColorFinder {
  // Campos estáticos PrivadosPúblicos
  static iAmStaticAndPublic = 'Hello'
  // Campos estáticos Privados
  static #red = '#ff0000'
  static #green = '#00ff00'
  static #blue = '#0000ff'
  static #orange = '#ffa500'

  #colorMode = 'hexadecimal'

   /**
   * Métodos estáticos públicos
   */
  static getColorModeFromInstance(instance) {
    return instance.#colorMode
  }

  static colorName(name) {
    switch (name) {
      case 'red':
        return ColorFinder.#red
      case 'blue':
        return ColorFinder.#blue
      case 'green':
        return ColorFinder.#green
      default:
        throw new RangeError('unknown color')
    }
  }

  getOpositeColor(name) {
    switch (name) {
      case 'red':
        return ColorFinder.#green
      case 'blue':
        return ColorFinder.#orange
      case 'green':
        return ColorFinder.#red
      default:
        throw new RangeError('unknown color')
    }
  }
}

const color = new ColorFinder()

console.group('============ Public and private static fields ============')

/**
 * Como es de esperarse los campos estáticos públicos de clase
 * son visibles desde el exterior...
 */
console.log('ColorFinder.iAmStaticAndPublic: ' + ColorFinder.iAmStaticAndPublic)

/**
 * ... Excepto para las instancias, esto valdrá undefine
 */
console.log('color.iAmStaticAndPublic: ' + color.iAmStaticAndPublic)
console.log(
  `The opposite of ${ColorFinder.colorName('red')} is ${color.getOpositeColor(
    'red'
  )}`
)
console.groupEnd()


console.group('============ Public and private static methods ============')
console.log(
  `Getting color mode from color instance: ${ColorFinder.getColorModeFromInstance(color)}`
)
console.groupEnd()
