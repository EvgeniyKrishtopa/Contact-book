
export function validateEmail(email) {
  const re = /^(([^<>()\t[\]\\.,;:\s@"]+(\.[^<>()\t[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


export function validatePhone(tel) {
  const re = /^[\t+]?[(]?[0-9]{3}[)]?[-\s\t.]?[0-9]{3}[-\s\t.]?[0-9]{4,6}$/im;
  return re.test(String(tel).toLowerCase());
}

export function validatePassword(password) {
  if(password.length >= 6 && password.length < 30) {
    return password;
  }
  //TODO: Undefined возвращать плохо)
  return undefined;
}