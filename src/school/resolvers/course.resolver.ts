import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Course } from 'src/school/entities/course.entity';
import { Subject } from 'src/school/entities/subject.entity';
import { Teacher } from 'src/school/entities/teacher.entity';

@Resolver(() => Course)
export class CourseResolver {
  @ResolveField('teacher', () => Teacher)
  public async teacher(@Parent() course: Course): Promise<Teacher> {
    return await course.teacher;
  }
  @ResolveField('subject', () => Course)
  public async subject(@Parent() course: Course): Promise<Subject> {
    return await course.subject;
  }
}
