"use client";

import React, { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

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
  },
  headerSub: {
    fontSize: 12,
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
    fontStyle: "Nunito",
  },
});
// Create Document Component
const PDFView = ({
  fullname,
    links, //links
    obj, //objective
    skills,
    exp, //experience
    edu, //education
    // yearsOfExperience,
}: {
  fullname: string;
  links: string,
  obj: string,
  skills: string,
  exp: string,
  edu:string
 
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
  return(
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerMain}>{fullname}</Text>
       
        <Text style={styles.headerSub}>{links}</Text>
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
        <Text style={styles.sectionHeader}>Experience:</Text>
        <Text style={styles.sectionDivider}/>
        <Text style={styles.content}>{exp}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Education:</Text>
        <Text style={styles.sectionDivider}/>
        <Text style={styles.content}>{edu}</Text>
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
  const [links, setlinks] = useState("");
  const [object, setobj] = useState("");
  const [skills, setskills] = useState("");
  const [expe, setHistory] = useState("");
  const [edu, setedu] = useState("");


  const handleGeneratePDF = () => {
    if (!fullname  || !links || !object
        || !skills || !expe || !edu
    )
      return alert("All fields are required");
    setShowPdf(true);
  };

  const formatLinks = (text:string) =>
  {
    // Split the input text by spaces
  const words = text.split(" ");
  
  // Join the words with " | " between each pair
  const formattedText = words.join("  |  ");

  return formattedText;
  }

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
            exp = {expe}
           
          />
          <PDFDownloadLink
            className='text-blue-500 underline'
            document={
              <PDFView
              fullname={fullname}
              links = {links}
              obj = {object}
              skills = {skills}
              edu = {edu}
              exp = {expe}
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
        <section className='flex flex-col gap-2'>
          <input
           //className={additionalStyles}
          style={additionalStyles}
            placeholder='Fullname'
            onChange={(e) => setFullname(e.target.value)}
          />
          <textarea
           // className={inputStyles}
            style={additionalStyles}
            placeholder='Links'
            onChange={(e) => setlinks(formatLinks(e.target.value))}
          />
          <textarea
            // className={inputStyles}
            style={additionalStyles}
            placeholder='Profile Summary/Objective'
            onChange={(e) => setobj(e.target.value)}
          />
          <textarea
            // className={inputStyles}
            style={additionalStyles}
            placeholder='Skills'
            onChange={(e) => setskills(formatSkills(e.target.value))}
          />
          <textarea
            // className={inputStyles}
            style={additionalStyles}
            placeholder='Experience / WorkHistory'
            onChange={(e) => setHistory(e.target.value)}
          />

         <textarea
           // className={inputStyles}
           style={additionalStyles}
            placeholder='Education'
            onChange={(e) => setedu(e.target.value)}
          />
         
         <button
            onClick={handleGeneratePDF}
            className='bg-slate-800 px-2 py-1.5 rounded text-slate-100'
          >
            Generate PDF
          </button>
         
        </section>
        
    
      )}
    </div>
  );
};

export default PDFCreatorPage;