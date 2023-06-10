import {
  Validator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from 'class-validator';

@ValidatorConstraint({ name: 'customPhone', async: false })
class CustomPhoneConstraint implements ValidatorConstraintInterface {
  validate(phone: string) {
    // 自定义手机号验证规则 正则表达式
    return new RegExp(/^1[3456789]\d{9}$/).test(phone);
  }
}

// 自定义手机号验证装饰器
export function IsCustomPhone(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isCustomPhone',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CustomPhoneConstraint
    });
  };
}
