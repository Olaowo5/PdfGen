"use client";



import React, { useState } from "react";
import MyHead from '../Components/head'; // Adjust the path based on your file structure
//import { Font, SingleLoad } from '@react-pdf/font';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Font,
  Link,

 
} from "@react-pdf/renderer";


//Font
// Register each font individually
Font.register({
  family: 'Nunito',
  src: '../../Fonts/Nunito/Nunito-Regular.ttf',
});

Font.register({
  family: 'Nunito',
  fontStyle: 'italic',
  src: '../../Fonts/Nunito/Nunito-Italic.ttf',
});

Font.register({
  family: 'Nunito',
  fontWeight: 'bold',
  src: '../../Fonts/Nunito/Nunito-Bold.ttf',
});

// Create styles for the pdf
/*
const styles = StyleSheet.create({
  page: {
    padding: "12px",
    height: "200px",
  },
  section: {
    backgroundColor: "#E4E4E4",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  logo: {
    width: 70,
    height: 70,
    marginTop: "15px",
  },

  
});
*/

const styles = StyleSheet.create({

  page: {
    padding: 12,
  },
  header: {
    marginBottom: 10,
    textAlign: 'center',
   
  },
  headerMain: {
    fontSize: 20,
    fontWeight: 'bold',
   // fontStyle: 'italic',
  },
  headerSub: {
    fontSize: 9,
  },
  section: {
    marginBottom: 10,
    /*
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    margin: 5,
    padding: 2,
    flexGrow: 1,*/
  },
  sectionHeader: {
    color: '#1155CC',
   fontWeight: 900,
    fontSize: 15,
    marginBottom: 0,
    paddingBottom: 0,
  },
  sectionDivider: {
    marginTop:0.2,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  category: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  content: {
    fontSize: 10,
    //fontFamily: "Nunito",
  },

  workHistoryEntry: {
    
    marginBottom: 5,
  },
  workHistoryHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 3,
    marginTop: 6,
  },
  workHistoryDetails: {
    marginBottom: 3,
    fontSize: 10,
    //fontFamily: "Nunito",
  },
  company: {
    fontWeight: 'bold',
    textDecoration: 'underline',
    fontSize: 10,
    
    //fontFamily: "Nunito",
    
  },
  dates: {
    fontWeight: 'semibold', // Semi-bold
    fontSize: 10,
    //fontFamily: "Nunito",
  },
  location: {
    fontStyle: 'italic',
   //fontFamily: 'Lato Italic',
    fontSize: 10,
    color: '#890b78',
    //: "Nunito",
  },
  role: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#092f71',
    //fontFamily: "Nunito",
  },
  exp: {
    marginTop: 4, // Adjust spacing between work history details and experience
    fontSize: 10,
  },
});
// Create Document Component
const PDFView = ({
  fullname,
    links, //links
    obj, //objective
    skills,
    workHistory, 
    edu, //education
    // yearsOfExperience,
}: {
  fullname: string;
  links: {label: string; url: string;}[],
  obj: string,
  skills: string,
  //edu:string,
  edu:{program: string; schools: string; location:string; dates:string; info:string;}[];

  workHistory: { company: string; dates: string; location: string; role: string; exp: string }[];
 
}) => {
  /*
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.section}>
        <Text>Fullname: {fullname}</Text>
        <Text>Links: {links}</Text>
        <Text>Objective: {obj}</Text>
        <Text>Skills: {skills}</Text>
        <Text>Education: {edu}</Text>
        <Text>Experience: {exp}</Text>
      </View>
    </Page>
  </Document>*/
  
  // Split the skills into lines
  const formattedSkills = skills.split("\n").map((skill, index) => {
    // Split each line into category and technologies
    const [category, technologies] = skill.split(":");
    // Apply bold styling to the category text
    const formattedCategory = <Text style={{ fontWeight: 'bold' }}>{category}</Text>;
    // Combine category and technologies with proper formatting
    return (
      <Text key={index} style={styles.content}>{formattedCategory}: {technologies}</Text>
    );
  });

  //Split the Links Url
  const formatedLinks = (links: { label: string; url: string }[]) => {
    return links.map(({ label, url }, index) => {
      if (url) {
        return (
          <React.Fragment key={index}>
            <Link src={url}>
              {label}
            </Link>
            {index < links.length - 1 && <Text>{" | "}</Text>}
            <br />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={index}>
            <Text>
              {label}
            </Text>
            {index < links.length - 1 && <Text>{" | "}</Text>}
            <br />
          </React.Fragment>
        );
      }
    });
  };

  return(
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerMain}>{fullname}</Text>
       
        <Text style={styles.headerSub}>{formatedLinks(links)}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Profile Summary:</Text>
        <Text style={styles.sectionDivider}/>
        <Text style={styles.content}>{obj}</Text>
      </View>
      <View style={styles.section}>
          <Text style={styles.sectionHeader}>Skills:</Text>
          <Text style={styles.sectionDivider}/>
          {formattedSkills}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Experience:</Text>
          <Text style={styles.sectionDivider}/>
          {workHistory.map((entry, index) => (
            <View key={index} style={styles.workHistoryEntry}>
              <View style={styles.workHistoryHeader}>
                <Text style={styles.role}>{entry.role}</Text>
                <Text style={styles.company}>{entry.company}</Text>
                <Text style={styles.location}>{entry.location}</Text>
                <Text style={styles.dates}>{entry.dates}</Text>
              </View>
              <Text style={styles.exp}>{entry.exp}</Text>
            </View>
          ))}
        </View>

         
    
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Education:</Text>
          <Text style={styles.sectionDivider}/>
          {edu.map((entry, index) => (
            <View key={index} style={styles.workHistoryEntry}>
              <View style={styles.workHistoryHeader}>
                <Text style={styles.role}>{entry.program}</Text> 
                <Text style={styles.company}>{entry.schools}</Text>
                <Text style={styles.location}>{entry.location}</Text>
                <Text style={styles.dates}>{entry.dates}</Text>
              </View>
              <Text style={styles.exp}>{entry.info}</Text>
            </View>
          ))}
        </View>
    </Page>
  </Document>
  );
};

// Function to extract links from the provided string
const parseLinks = (text: string) => {
  const linksArray = text.split(' ').map(link => {
    const [label, url] = link.split(/:\{(.+?)\}/).filter(Boolean);
    return { label, url };
  });
  return linksArray;
};


const PDFCreatorPage = () => {


  
  //default states
  const defaultFullname = "Olamide Owolabi";
  const defaultLinksText = 'LinkedIn:{https://www.linkedin.com/in/olamide-owolabi/} 613-304-5454:{} olamideowolabi:{https://olamideowolabi.com/} adejimiowo2@outlook.com:{} GitHub:{https://github.com/Olaowo5}';
  const defaultLinks = parseLinks(defaultLinksText);

  const infostring = 'Developed a responsive website with backend solutions with ReactJS.\n' +
  'Completed a comprehensive assignment project involving the development of a database-driven website using Java in the Eclipse IDE.\n' +
  'Implemented CRUD (Create, Read, Update, Delete) functionality to interact with and manipulate data stored in the database.\n' +
  'Designed and developed a PHP-based healthcare website enabling appointment scheduling, real-time messaging, and blog functionality to bridge healthcare providers and clients.';

  const infostringii = 'Completed a substantive individual piece of work entitled “The Study of a Dual Active Bridge (DAB) DC-DC Converter for battery charging \n.'+
                       'Built an autonomous vehicle using a combination of a microprocessor, toy car hub, MATLAB and Visual Studio. \n'+
                       ' Earned commendations for seeing project to completion, in response to incapacitation of other 2 team members midway through a 3-month schedule.';

  const infostringiii = 'Completed a comprehensive project in Unity for UX development, focusing on enhancing user experience and interaction design across multiple applications.\n' +
                       'Designed and implemented AI NPCs (Non-Player Characters) for interactive applications in Unity, enabling realistic behavior and enhancing user engagement.\n' +
                       'Created demonstrations of numerous author books, developing intuitive, easy-to-understand Unity-based applications to simplify complex content for a wider audience.\n' +
                       'Built a database-driven website using Java in Eclipse IDE, incorporating CRUD (Create, Read, Update, Delete) functionality to efficiently manage and manipulate stored data.';
 


  const workExpi = 'Developed and maintained client-facing medical billing applications using C# and .NET Core.\n' +
                    'Built and deployed applications in cloud environments (AWS, Azure, Docker, Kubernetes).\n' +
                    'Designed and implemented RESTful and SOAP web services for secure data exchange.\n'+
                    'Conducted unit and integration testing to ensure application reliability and performance.\n' +
                    'Collaborated with cross-functional teams to gather requirements and deliver high-quality solutions.';

  const workExpii = 'Developed enterprise applications using C#, .NET Core, and MVC architecture.\n' +
                    'Managed relational databases, including SQL Server and PostgreSQL, ensuring data integrity and performance.\n' +
                    'Implemented front-end components using JavaScript, HTML, and CSS, ensuring responsive and user-friendly interfaces.\n'+
                    'Utilized cloud platforms (AWS, GCP) for application deployment and scaling.\n' +
                    'Ensured application security and compliance with industry standards.';

  const workExpiii = 'Designed and implemented cloud-native applications using C# and .NET Core.\n' +
                    'Managed and optimized relational databases, ensuring high availability and performance.\n' +
                    'Conducted comprehensive testing, including unit and integration tests, to ensure software quality.\n'+
                    'Implemented DevOps practices using GitHub and Jenkins for continuous integration and deployment.\n' +
                    'Monitored application performance using New Relic and Splunk, addressing issues proactively.';

  const workExpiv = 'Migrated legacy CI/CD pipelines from Jenkins to GitHub Actions, streamlining the deployment process and reducing deployment times.\n' +
                    'Recreated and optimized existing Jenkins functions into GitHub Actions workflows, ensuring smooth and efficient transitions.\n' +
                    'Set up and configured GitHub Actions workflows for automated builds, tests, and deployments, enhancing operational efficiency and reducing manual intervention.\n'+
                    'Collaborated with development teams to ensure the successful integration of GitHub Actions, improving deployment speed and consistency.\n' +
                    'Monitored and troubleshot CI/CD pipelines, ensuring high availability and reliability during the migration process.';                  


                         //will need to fix here not accepting space or enter has inputs
const formatExperience = (inputText: string) => {

  // Define the regular expression pattern to match sentences
  const sentencePattern = /[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/g;

  // Extract sentences from the text
  const sentences = inputText.match(sentencePattern);

  // Initialize an empty array to store formatted experience
  const formattedExperience: string[] = [];

  // Iterate over each sentence and add bullet points
  sentences?.forEach((sentence) => {
    formattedExperience.push(`• ${sentence.trim()}`);
  });

  // Join the formatted experience with newlines
  const result = formattedExperience.join("\n");

  return result;
};


  const defaultEduEntries: EduHistoryEntry [] = [
    {
      program: "Computer Programming",
      dates: "April 2022 - Dec 2023",
      schools:"Algonquion College",
      location: "Ottawa Canada",
      info: formatExperience(infostring),
      
    },

    {
      program: "Adv Media Study with Computer Science",
      dates: "Sept 2016 - Aug 2018",
      schools:"University Of South Carolina",
      location: "USA",
      info: formatExperience(infostringiii),
      
    },

    {
      program: "Beng Electrical Engineering",
      dates: "Sept 2013 - Jun 2015",
      schools: "Newcastle University",
      location: "Newcastle, United Kingdom",
      info: formatExperience(infostringii),
    }


  ];

  const defaultWorkExp: WorkHistoryEntry [] =[

    {
      company: "Sphere Research Ltd/ Cozmos",
      dates: "07/2024 – Current",
      location: "Ottawa/Remote",
      role: "Devops Engineer",
      exp: formatExperience(workExpiv),
    },
    {
      company: "Ukemey Inc",
      dates: "08/2023 – 01/2024",
      location: "Ottawa/Remote",
      role: "Senior Full-Stack Developer",
      exp: formatExperience(workExpi),
    },
    {
      company: "TryCycle Data Systems",
      dates: "02/2023 – 06/2023",
      location: "Ottawa",
      role: "Full-Stack Developer",
      exp: formatExperience(workExpii),
    },

    {
      company: "Reliance Infosystems",
      dates: "06/2019 - 05/2022",
      location: "Ottawa/Remote",
      role: "Cloud Engineer",
      exp: formatExperience(workExpiii),
    },


  ];

  


  const extractLinks = (text: string) => {
    // Regular expression to match labels and URLs
    const linkRegex = /(\S+)\s*:\s*{(\s*https?:\/\/[^\s{}]+|\s*|\s*)}/g;
  
    // Extract labels and URLs from the input text
    const links: { label: string; url: string }[] = [];
    let match;
    while ((match = linkRegex.exec(text)) !== null) {
      const [, label, url] = match;
      links.push({ label, url: url.trim() });
    }
  
    console.log(links);
    return links;
  };

  const [showPdf, setShowPdf] = useState(false);
  const[applicant, setapplicant] = useState("");
  const [fullname, setFullname] = useState(defaultFullname);
  //const [profession, setProfession] = useState(""); changed here
  //const [yearsOfExperience, setYearsOfExperience] = useState(""); chnaged here
  //const [links, setlinks] = useState([{label: "", url: ""}]);
  const [links, setlinks] = useState(extractLinks(defaultLinksText));

  const [object, setobj] = useState(""); //Objective
  const [skills, setskills] = useState("");
  /*
  const [edu, setedu] = useState([
    {program: "", schools: "", location:"", dates:"", info:""},
  ]);
  */
 //will add the default education
  const [edu, setedu] = useState<EduHistoryEntry[]>(defaultEduEntries);

/*
  // State for work history entries
  const [workHistory, setWorkHistory] = useState([
    { company: "", dates: "", location: "", role: "", exp: ""},
  ]);
*/

const [workHistory, setWorkHistory] = useState<WorkHistoryEntry[]>(defaultWorkExp);

  const handleGeneratePDF = () => {
    if (!fullname  || !links || !object
        || !skills || !edu
    )
      return alert("All fields are required");
    setShowPdf(true);
  };

  /*
  const formatLinks = (text: string) => {
    // Split the input text by spaces
    const links = text.split(/\s+/);
  
    // Initialize an array to store formatted links
    const formattedLinks: string[] = [];
  
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/;
  
    // Iterate over each word
    links.forEach(link => {
      // Check if the word is a URL
      const match = link.match(urlRegex);
      if (match) {
        // If it's a URL, add it to the formatted links
        formattedLinks.push(link);
      }
    });
  
    // Join the formatted links with the pipe symbol
    const result = formattedLinks.join(' | ');
  
    return result;
  };
  */

 



  // Define a type/interface for the work history entry
interface WorkHistoryEntry {
  company: string;
  dates: string;
  location: string;
  role: string;
  exp: string;
}

  

  // Function to add new work history entry
  const addWorkHistoryEntry = () => {
    setWorkHistory([...workHistory, { company: "", dates: "", location: "", role: "" , exp: ""}]);
  };

 // Function to handle changes in work history entry
const handleWorkHistoryChange = (index: number, key: keyof WorkHistoryEntry, value: string) => {
  const updatedWorkHistory = [...workHistory];
  updatedWorkHistory[index][key] = value;
  setWorkHistory(updatedWorkHistory);
};

 // Define a type/interface for the work history entry
 interface EduHistoryEntry {
  program: string;
  dates: string;
  location: string;
  schools: string;
  info: string;
}

// Function to add new work history entry
const addEduHistoryEntry = () => {
  setedu([...edu, { program: "", dates: "", location: "", schools: "" , info: ""}]);
};

// Function to handle changes in work history entry
const handleEduHistoryChange = (index: number, key: keyof EduHistoryEntry, value: string) => {
const updatedEduHistory = [...edu];
updatedEduHistory[index][key] = value;
setedu(updatedEduHistory);
};



  const formatSkills = (inputText:string) =>{
  // Split the input text into lines
  const lines = inputText.split("\n");
  
  // Initialize an empty array to store formatted skills
  const formattedSkills: string[] =[];

  // Iterate over each line
  lines.forEach(line => {
    // Split the line into category and technologies
    const [category, technologies] = line.split(":");
    
    // Trim leading and trailing whitespace from category and technologies
    const trimmedCategory = category.trim();
    const trimmedTechnologies = technologies.trim();

    // Split technologies into individual items
    const techArray = trimmedTechnologies.split(",").map(tech => tech.trim());

    // Format the technologies followed by a colon (:) and the skills separated by commas
    const formattedLine = `• ${trimmedCategory}: ${techArray.join(", ")}`;

    // Push the formatted line to the array
    formattedSkills.push(formattedLine);
  });

  // Join the formatted skills with newlines
  const result = formattedSkills.join("\n");

  return result;
  }

  const inputStyles = "border border-slate-200 p-1.5 rounded";
  const additionalStyles = {
    padding: '8px',
    fontSize: '15px',
    border: '2px solid #00eeff',
    borderRadius: '4px',   
    minHeight: '20px',
    minWidth: '20rem',
  };

const focusStyles = `
  outline: none; /* Remove default focus outline */
  border-color: #007bff; /* Change border color on focus */
`;






  return (

    
    <div className='flex justify-center items-center min-h-screen'>
      {showPdf ? (
        <div className='flex flex-col items-center'>
          <PDFView
            fullname={fullname}
            links = {links}
            obj = {object}
            skills = {skills}
            edu = {edu}         
            workHistory={workHistory}
           
          />
          <PDFDownloadLink
           style={{ marginTop: '120px' }} // Adjust the value as needed
            className='text-blue-500 underline'
            document={
              <PDFView
              fullname={fullname}
              links = {links}
              obj = {object}
              skills = {skills}
              edu = {edu}              
              workHistory={workHistory}
              />
            }
            fileName={`${applicant}_${fullname}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download pdf file"
            }
          </PDFDownloadLink>
        </div>
      ) : (
        <><MyHead />
        
        <section className='container-l flex-grow-1 container-p-y'>
        <h4 className="py-3 mb-4">
        <span className="text-muted fw-light">Resume Forms/</span> Pdf Generator
        </h4>
          <div className="row">

          <div className="col-md-6">
              <div className="card mb-4">
                <h5 className="card-header">Enter Target Company Name</h5>
                <div className="card-body">
                 

                    
                    <input
                      id="applicant"
                      className="form-control"
                      //style={additionalStyles}
                      placeholder='Aplicant'
                      onChange={(e) => setapplicant(e.target.value)}/>
                  
                  </div>
            </div>
            </div>
           
            <div className="col-md-6">
              <div className="card mb-4">
                <h5 className="card-header">Enter Full Name</h5>
                <div className="card-body">
                 

                    
                    <input
                      id="fullname"
                      className="form-control"
                      //style={additionalStyles}
                      value={fullname}
                      placeholder='Fullname'
                      onChange={(e) => setFullname(e.target.value)} />
                  
                  </div>
            </div>
            </div>

            <div className="col-md-6">
              <div className="card mb-4">
                <h5 className="card-header">Links</h5>
            <div className="card-body">
          
            <textarea
              className="form-control"
              id="linkl"
              //style={additionalStyles}
              placeholder='Links'
              value={defaultLinksText}
              onChange={(e) => setlinks(extractLinks(e.target.value))} />
              </div>
              </div>
              </div>

          <div className="col-md-6">
              <div className="card mb-4">
                <h5 className="card-header">Enter Profile/Summary</h5>
                <div className="card-body">
              <textarea
             
                className="form-control"
                //style={additionalStyles}
                placeholder='Profile Summary/Objective'
                onChange={(e) => setobj(e.target.value)} />

                </div>
              </div>
          </div>


          <div className="col-md-6">
            <div className="card mb-4">
              <h5 className="card-header">Enter Skills</h5>
              <div className="card-body">
            <textarea
            id="skillo"
              className="form-control"
              //style={additionalStyles}
              placeholder='Skills'
              onChange={(e) => setskills(formatSkills(e.target.value))} />
              </div>
            </div>
          </div>

            <div className="col-md-6">
            <div className="card mb-4">
            <h5 className="card-header">Enter Work History</h5>
            <div className="card-body">
            <div style={additionalStyles}>
              {/* Work History entering */}
              {/* Input fields for personal information */}
              {/* Input fields for work history */}
              {workHistory.map((entry, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <input
                  className="form-control"
                    type="text"
                    placeholder="Company"
                    value={entry.company}
                    onChange={(e) => handleWorkHistoryChange(index, "company", e.target.value)} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Dates"
                    value={entry.dates}
                    onChange={(e) => handleWorkHistoryChange(index, "dates", e.target.value)} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    value={entry.location}
                    onChange={(e) => handleWorkHistoryChange(index, "location", e.target.value)} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Role"
                    value={entry.role}
                    onChange={(e) => handleWorkHistoryChange(index, "role", e.target.value)} />
                  <textarea
                    placeholder="Experience"
                    className="form-control"
                    value={entry.exp}
                    onChange={(e) => handleWorkHistoryChange(index, "exp", formatExperience(e.target.value))} />
                </div>
              ))}
              {/* Button to add new work history entry */}
              <button onClick={addWorkHistoryEntry}
                className='bg-slate-600 px-2 py-1.5 rounded text-slate-100'
              >Add Work History Entry</button>



            </div>
            </div>
            </div>
            </div>

            <div className="col-md-6">
              <div className="card mb-4">
              <h5 className="card-header">Enter Education</h5>
              <div className="card-body">
            <div style={additionalStyles}>
              {/* Education entering */}
              {/* Input fields for personal information */}
              {/* Input fields for work history */}
              {edu.map((entry, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <input
                  className="form-control"
                    type="text"
                    placeholder="School Program"
                    value={entry.program}
                    onChange={(e) => handleEduHistoryChange(index, "program", e.target.value)} />
                  <input
                    type="text"
                   
                    className="form-control"
                    placeholder="School"
                    value={entry.schools}
                    onChange={(e) => handleEduHistoryChange(index, "schools", e.target.value)} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Dates"
                    value={entry.dates}
                    onChange={(e) => handleEduHistoryChange(index, "dates", e.target.value)} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    value={entry.location}
                    onChange={(e) => handleEduHistoryChange(index, "location", e.target.value)} />

                  <textarea
                   className="form-control"
                    placeholder="Info"
                    value={entry.info}
                    onChange={(e) => handleEduHistoryChange(index, "info", formatExperience(e.target.value))} />
                </div>
              ))}
              {/* Button to add new work history entry */}
              <button onClick={addEduHistoryEntry}
                className='bg-slate-600 px-2 py-1.5 rounded text-slate-100'
              >Add Work Education Entry</button>

            </div>
            </div>
            </div>
           

            
         </div>
        
              <div className="mb-2 d-flex justify-content-center">
            <button
              onClick={handleGeneratePDF}
              className='btn btn-lg btn-dark'
            >
              Generate PDF
            </button>
            </div>
      </div>

          </section></>
        
    
      )}
    </div>
  );
};

export default PDFCreatorPage;