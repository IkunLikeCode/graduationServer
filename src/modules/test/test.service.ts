import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Repository } from 'typeorm';
@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}
  create(createTestDto: CreateTestDto) {
    return this.testRepository.save(createTestDto);
  }

  findAll() {
    return {
      age: 18,
      name: '张三',
      sex: '男',
      email: '123@qq.com',
    };
  }

  findOne(id: number) {
    return this.testRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
