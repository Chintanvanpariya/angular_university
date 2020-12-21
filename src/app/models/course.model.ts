export interface ICourse {
  title: string;
  courseId: number;
  courseCode: string;
}

export interface ICourseSchedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  facultyId: number;
}
