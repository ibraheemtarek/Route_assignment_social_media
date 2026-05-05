class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    cause?: unknown,
  ) {
    super(message, { cause });
    // console.log(this.constructor.name);
    // console.log(this.name);
    this.name = this.constructor.name;
  }
}

export default CustomError;
