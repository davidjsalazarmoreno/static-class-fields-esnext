class ColorFinder {
  // Campos estáticos Públicos
  static iAmStaticAndPublic = 'Hello Mundo'
  static withoutInitialize
  // Campos estáticos Privados
  static #red = '#ff0000'
  static #green = '#00ff00'
  static #blue = '#0000ff'
  static #orange = '#ffa500'

  // Campo privado de instancia, ve mi otro video en el canal :-D
  #colorMode = 'hexadecimal'

  constructor(colorMode = 'hexadecimal') {
    this.#colorMode = colorMode
  }

  /**
   * Métodos estáticos públicos
   */
  static getColorModeFromInstance(instance) {
    return instance.#colorMode
  }

  static getColorName(name) {
    switch (name) {
      case 'red':
        return ColorFinder.#red
      case 'blue':
        return ColorFinder.#blue
      case 'green':
        return ColorFinder.#green
      default:
        return ColorFinder.#randomColorPicker()
    }
  }

  static #randomColorPicker() {
    const colors = [ColorFinder.#red, ColorFinder.#blue, ColorFinder.#green]
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
  }

  getOpositeColor(name) {
    switch (name) {
      case 'red':
        /**
         * Esto arrojaría un error de TypeError: Private static access of wrong provenance
         */
        // return this.#red
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

// class MyColorFinderV2 extends ColorFinder {
//   #red = 'myRed'

//   constructor() {
//     this.#red = super.#red
//   }

//   getColor() {
//     return this.#red
//   }
// }

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

/**
 * La totalidad del código dentro del cuerpo de una clase puede acceder a todos los campos privados,
 * por ejemplo:
 */

/**
 * 1. Los métodos estáticos (getColorName) y 2. los métodos de instancia (getOpositeColor)
 */
console.log(
  `The opposite of ${ColorFinder.getColorName(
    'red'
  )} is ${color.getOpositeColor('red')}`
)
console.groupEnd()

console.group('============ Public and private static methods ============')
/**
 * 3. Un método estatico accediendo a una instancia (new ColorFinder())
 */
console.log(
  `Getting color mode from color instance: ${ColorFinder.getColorModeFromInstance(
    color
  )}`
)
console.log(
  `Getting color mode from a new instance: ${ColorFinder.getColorModeFromInstance(
    new ColorFinder('rgb')
  )}`
)

/**
 * 4. O un método público que en su cuerpo llama a un método estático privado,
 * como es el caso de #randomColorPicker que es llamado cuando mandamos un color
 * desconocido como argumento de getColorName.
 */
console.log(
  `Getting a random color from a unknow color: ${ColorFinder.getColorName(
    'cyan'
  )}`
)
console.groupEnd()

console.group('============ Subclasses and private fields ============')

/**
 * Esto Provocará im error de babel:  Private fields can't be accessed on super (55:16)
 */
// console.log(new MyColorFinderV2().getColor())
console.groupEnd()
