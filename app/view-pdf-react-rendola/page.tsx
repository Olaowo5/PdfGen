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
    //: "Nunito",
  },
  role: {
    fontWeight: 'bold',
    fontSize: 10,
    //fontFamily: "Nunito",
  },
  exp: {
    marginTop: 2, // Adjust spacing between work history details and experience
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
        <Text style={styles.sectionHeader}>Objectives:</Text>
        <Text style={styles.sectionDivider}/>
        <Text style={styles.content}>{obj}</Text>
      </View>
      <View style={styles.section}>
          <Text style={styles.sectionHeader}>Skills:</Text>
          <Text style={styles.sectionDivider}/>
          {formattedSkills}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Work History/Experience:</Text>
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

const PDFCreatorPage = () => {
  const [showPdf, setShowPdf] = useState(false);
  const [fullname, setFullname] = useState("");
  const [profession, setProfession] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [links, setlinks] = useState([{label: "", url: ""}]);
  const [object, setobj] = useState(""); //Objective
  const [skills, setskills] = useState("");
  
  const [edu, setedu] = useState([
    {program: "", schools: "", location:"", dates:"", info:""},
  ]);
  // State for work history entries
  const [workHistory, setWorkHistory] = useState([
    { company: "", dates: "", location: "", role: "", exp: ""},
  ]);


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
    const formattedLine = `${trimmedCategory}: ${techArray.join(", ")}`;

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
            fileName='React_ola.pdf'
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download pdf file"
            }
          </PDFDownloadLink>
        </div>
      ) : (
        <><MyHead />
        <section className='flex flex-col gap-2'>
            <div className="card mb-4">
              <h5 className="card-header">Default</h5>
              <div className="card-body">
                <div>
                  <label htmlFor="fullname" className="form-label">Name</label>
                  <input
                    id="fullname"
                    //className={additionalStyles}
                    style={additionalStyles}
                    placeholder='Fullname'
                    onChange={(e) => setFullname(e.target.value)} />
                </div>
              </div>
            </div>
            <textarea
              // className={inputStyles}
              style={additionalStyles}
              placeholder='Links'
              onChange={(e) => setlinks(extractLinks(e.target.value))} />
            <textarea
              // className={inputStyles}
              style={additionalStyles}
              placeholder='Profile Summary/Objective'
              onChange={(e) => setobj(e.target.value)} />
            <textarea
              // className={inputStyles}
              style={additionalStyles}
              placeholder='Skills'
              onChange={(e) => setskills(formatSkills(e.target.value))} />



            <div style={additionalStyles}>
              {/* Work History entering */}
              {/* Input fields for personal information */}
              {/* Input fields for work history */}
              {workHistory.map((entry, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Company"
                    value={entry.company}
                    onChange={(e) => handleWorkHistoryChange(index, "company", e.target.value)} />
                  <input
                    type="text"
                    placeholder="Dates"
                    value={entry.dates}
                    onChange={(e) => handleWorkHistoryChange(index, "dates", e.target.value)} />
                  <input
                    type="text"
                    placeholder="Location"
                    value={entry.location}
                    onChange={(e) => handleWorkHistoryChange(index, "location", e.target.value)} />
                  <input
                    type="text"
                    placeholder="Role"
                    value={entry.role}
                    onChange={(e) => handleWorkHistoryChange(index, "role", e.target.value)} />
                  <textarea
                    placeholder="Experience"
                    value={entry.exp}
                    onChange={(e) => handleWorkHistoryChange(index, "exp", formatExperience(e.target.value))} />
                </div>
              ))}
              {/* Button to add new work history entry */}
              <button onClick={addWorkHistoryEntry}
                className='bg-slate-600 px-2 py-1.5 rounded text-slate-100'
              >Add Work History Entry</button>



            </div>

            <div style={additionalStyles}>
              {/* Education entering */}
              {/* Input fields for personal information */}
              {/* Input fields for work history */}
              {edu.map((entry, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="School Program"
                    value={entry.program}
                    onChange={(e) => handleEduHistoryChange(index, "program", e.target.value)} />
                  <input
                    type="text"
                    placeholder="School"
                    value={entry.schools}
                    onChange={(e) => handleEduHistoryChange(index, "schools", e.target.value)} />
                  <input
                    type="text"
                    placeholder="Dates"
                    value={entry.dates}
                    onChange={(e) => handleEduHistoryChange(index, "dates", e.target.value)} />
                  <input
                    type="text"
                    placeholder="Location"
                    value={entry.location}
                    onChange={(e) => handleEduHistoryChange(index, "location", e.target.value)} />

                  <textarea
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


            <button
              onClick={handleGeneratePDF}
              className='bg-slate-800 px-2 py-1.5 rounded text-slate-100'
            >
              Generate PDF
            </button>

          </section></>
        
    
      )}
    </div>
  );
};

export default PDFCreatorPage;