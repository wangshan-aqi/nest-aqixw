import {
  Validator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from 'class-validator';

@ValidatorConstraint({ name: 'customEmail', async: false })
class CustomEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string) {
    // 自定义验证规则 验证邮箱 正则表达式 符合返回true 不符合返回false
    return new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(
      email
    );
  }
}

// 自定义验证器 用于验证邮箱
export function IsCustomEmail(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isCustomEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CustomEmailConstraint
    });
  };
}
