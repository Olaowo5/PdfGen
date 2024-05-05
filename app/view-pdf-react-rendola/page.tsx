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

// Create styles
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
 
}) => (
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
  </Document>
);

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
            onChange={(e) => setlinks(e.target.value)}
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
            onChange={(e) => setskills(e.target.value)}
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