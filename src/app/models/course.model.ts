export class ICourse {
  title: string;
  courseId: number;
  courseCode: string;
}

export class ICourseSchedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  facultyId: number;
}
