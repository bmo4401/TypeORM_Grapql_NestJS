import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Course } from 'src/school/entities/course.entity';
import { Subject } from 'src/school/entities/subject.entity';
import { Teacher } from 'src/school/entities/teacher.entity';

@Resolver(() => Subject)
export class SubjectResolver {
  @ResolveField('teachers', () => [Teacher])
  public async teachers(@Parent() subject: Subject): Promise<Teacher[]> {
    return await subject.teachers;
  }
  @ResolveField('courses', () => [Course])
  public async courses(@Parent() subject: Subject): Promise<Course[]> {
    return await subject.courses;
  }
}
