import react,{useState} from "react";
import DashboardCards from '../components/students-component/studentdashboard/dashboard-card';
import TermSelection from '../components/students-component/studentTermSelection/TermSelection';
import RegisteredCourses from '../components/students-component/student-course/RegisterCourse/RegisteredCourses';
import SearchCourses from '../components/students-component/student-course/SearchCourses/SearchCourses';
import QuickActions from '../components/students-component/QuickActions/QuickActions';

export default function StudentPage(){
const [registeredCourses, setRegisteredCourses] = useState([]);

  const handleRegister = (code) => {
    setRegisteredCourses((prev) => {
      if (prev.includes(code)) return prev; // avoid duplicate registration
      return [...prev, code];
    });
  };
  const handleRemoveCourse = (courseCode) => {
    setRegisteredCourses(prev => prev.filter(code => code !== courseCode));
  };

    return(
        <>
     <DashboardCards/>
     <TermSelection/>
      <RegisteredCourses registeredCourses={registeredCourses} onRemoveCourse={handleRemoveCourse}/>
      <SearchCourses onRegister={handleRegister} />
     <QuickActions progressBar={registeredCourses}/>
     </>
       
    )
}