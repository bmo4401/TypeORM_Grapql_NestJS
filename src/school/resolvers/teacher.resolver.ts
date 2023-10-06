import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/school/entities/subject.entity';
import { Teacher } from 'src/school/entities/teacher.entity';
import { TeacherAddInput } from 'src/school/input/teacher-add.input';
import { TeacherEditInput } from 'src/school/input/teacher-edit.input';
import { EntityWithId } from 'src/school/types/school.types';
import { Repository } from 'typeorm';

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}
  @Query(() => [Teacher])
  public async teachers(): Promise<Teacher[]> {
    const data = await this.teachersRepository.find({
      /*       relations: ['subjects'], */
    });
    console.log('❄️ ~ file: teacher.resolver.ts:38 ~ data:', data);
    return data;
  }

  @Query(() => Teacher)
  public async teacher(
    @Args('teacherId', { type: () => Int })
    id: number,
  ): Promise<Teacher> {
    return await this.teachersRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }
  /* create */
  @Mutation(() => Teacher, { name: 'teacherAdd' })
  public async create(
    @Args('input', { type: () => TeacherAddInput })
    input: TeacherAddInput,
  ): Promise<Teacher> {
    const data = await this.teachersRepository.save(new Teacher(input));

    return data;
  }
  /* update */
  @Mutation(() => Teacher, { name: 'teacherEdit' })
  public async update(
    @Args('teacherId', { type: () => Int })
    id: number,
    @Args('input', { type: () => TeacherEditInput })
    input: TeacherEditInput,
  ): Promise<Teacher> {
    const teacher = await this.teachersRepository.findOneOrFail({
      where: {
        id,
      },
    });
    return await this.teachersRepository.save(
      new Teacher(Object.assign(teacher, input)),
    );
  }

  /* delete */
  @Mutation(() => EntityWithId, { name: 'teacherDelete' })
  public async delete(
    @Args('teacherId', { type: () => Int })
    id: number,
  ): Promise<EntityWithId> {
    const teacher = await this.teachersRepository.findOneOrFail({
      where: {
        id,
      },
    });
    /* remove and delete -> delete no check if teacher existing */
    await this.teachersRepository.remove(teacher);
    return new EntityWithId(id);
  }
  /* sub resolver */
  @ResolveField('subjects')
  public async subjects(@Parent() teacher: Teacher): Promise<Subject[]> {
    console.log('Called');
    return await teacher.subjects;
  }
}
