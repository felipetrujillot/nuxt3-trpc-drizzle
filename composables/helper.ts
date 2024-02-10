/**
 * Conecta directamente con el DOM para hacer visible una modal
 * esconde el scrollbar
 * @param id_content
 */
export const showModal = (id_content: string) => {
  const modal = document.getElementById(id_content);
  modal?.classList.add("show");
  modal?.classList.add("d-block");
  //const body = document.querySelector('body')
  //if (body != null) body.style.overflowY = 'hidden'
};

/**
 * Vuelve a mostrar el scrollbar
 */
export const closeModal = () => {
  const body = document.querySelector("body");
  if (body != null) body.style.overflowY = "auto";
};
/**
 *
 * @param numero
 */
export const clpFormat = (numero: number) => {
  // Configuración para formato de moneda chilena
  const formatoPesosChilenos = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0, // Puedes ajustar esto según tus necesidades
  });
  // Formatear el número a pesos chilenos
  return formatoPesosChilenos.format(numero);
};

/**
 *
 * @param timeStampRecibido
 * @returns
 */
export const formatearTimeStamp = (timeStampRecibido: string) => {
  //Formateamos Fecha
  const fecha = timeStampRecibido.substring(0, 10);
  const diaFecha = fecha.substring(8, 10);
  const mesFecha = fecha.substring(5, 7);
  const anioFecha = fecha.substring(0, 4);
  //Formateamos Hora

  return {
    nuevaFecha: diaFecha + "-" + mesFecha + "-" + anioFecha,
    nuevaHora: timeStampRecibido.substring(11, 16),
  };
};

export const formatearDate = (date: Date) => {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear();

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return {
    nuevaFecha: `${day}-${month}-${year}`,
    nuevaHora: `${hours}:${minutes}`,
  };
};

export const generateRandom13Digits = () => {
  // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Convert the decimal to a 13-digit integer
  const random13Digits = Math.floor(randomDecimal * 1000000000000);

  return random13Digits;
};

/**
 *
 * @returns
 */
export const generateRandom5Digits = () => {
  // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Convert the decimal to a 13-digit integer
  const random13Digits = Math.floor(randomDecimal * 10000);

  return random13Digits;
};

export const generateRandomHex = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  // Ensure the color has six digits (add leading zeros if needed)
  return "#" + "0".repeat(6 - randomColor.length) + randomColor;
};

/**
 * Manipulador de strings, util para validator
 * recibe string y puede retornar number
 */
export class StringManipulator {
  private inputString: string;

  constructor(inputString: string) {
    this.inputString = inputString;
  }

  public appendString(newString: string): StringManipulator {
    this.inputString += newString;
    return this;
  }

  public restrictToMaxCharacters(maxCharacters: number): StringManipulator {
    if (this.inputString.length > maxCharacters) {
      this.inputString = this.inputString.substring(0, maxCharacters);
    }
    return this;
  }

  public extractNumbers(): StringManipulator {
    this.inputString = this.inputString.replace(/[^0-9]/g, "");
    return this;
  }

  public getString(): string {
    return this.inputString;
  }

  public getNumber(): number {
    return parseInt(this.inputString);
  }
}

/**
 * regex que valida si el input es email
 * @param email
 * @return boolean
 */
export const isEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  if (!emailRegex.test(email)) {
    return false;
  } else {
    return true;
  }
};
