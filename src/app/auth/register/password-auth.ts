// Validación de password para FormBuilder Validator personalizado
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const validarPassword : ValidatorFn = ( control: AbstractControl ): ValidationErrors | null => {
    
    // si las passwords son identicas retorna null, de lo contrario retorna un objeto que indica que no son iguales
    return control.value.password === control.value.password2 ? null : { noSonIguales: true };
};
