import { IsNotEmpty } from 'class-validator';
export class CreateTestDto {
  @IsNotEmpty({ message: '请输入测试名称' })
  name: string;
}
