import Section1 from "../components/HomeComponent/HopePageSections/Section1"
import Section2 from "../components/HomeComponent/HopePageSections/Section2";
import Section3 from "../components/HomeComponent/HopePageSections/Section3";
import Section4 from "../components/HomeComponent/HopePageSections/Section4";
import Section5 from "../components/HomeComponent/HopePageSections/Section5";
// What non-users see
// - View all programs
// - View all coursese
// - Button to go to Signup
// - Button/link to Login (can be modal or separate page)

function Home() {
  return ( 
    <div>
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <Section4></Section4>
      <Section5></Section5>
    </div>
  );
}

export default Home;