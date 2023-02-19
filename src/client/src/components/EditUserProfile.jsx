import React, { useState } from "react";
import "../css/EditUserProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditUserProfile = () => {
  const [languages, setLanguages] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [workExp, setWorkExp] = useState([]);
  const [volunteering, setVolunteering] = useState([]);

  const [userData, setUserData] = useState({
    email: "",
    bio: "",
    headLine: "",
    languages: "",
    education: [],
    skills: [],
    workExp: [],
    volunteering: []
  });

  const navigate = useNavigate();

  const submitEditProfile = async e => {
    e.preventDefault();
    axios
      .patch("http://localhost:9000/users/profile/63ec368ad3117dd2175dbd62", {
        bio: userData.bio,
        headLine: userData.headLine,
        languages: userData.languages,
        email: userData.email,
        education: userData.education,
        skills: userData.skills,
        workExp: userData.workExp,
        volunteering: userData.volunteering
      })
      .then(response => {
        console.log(response.data);
        navigate("/UserProfile");
      })
      .catch(error => {
        console.log(error);
        alert("Error editing user profile");
      });
  };

  const languagesChange = () => {
    setUserData({ ...userData, languages: [...userData.languages, languages] });
    setLanguages("");
  };

  const educationChange = () => {
    setUserData({ ...userData, education: [...userData.education, education] });
    setEducation("");
  };

  const skillsChange = () => {
    setUserData({ ...userData, skills: [...userData.skills, skills] });
    setSkills("");
  };

  const workExpChange = () => {
    setUserData({ ...userData, workExp: [...userData.workExp, workExp] });
    setWorkExp("");
  };

  const volunteeringChange = () => {
    setUserData({ ...userData, volunteering: [...userData.volunteering, volunteering] });
    setVolunteering("");
  };

  return (
    <div className="EditUserProfileContainer">
      <div className="left-side"></div>
      <form className="userProfileForm" onSubmit={submitEditProfile}>
        <div className="EditUserForm-Container">
          <label>
            Email
            <input type="email" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
          </label>
          <br />
          <label>
            Bio
            <textarea value={userData.bio} onChange={e => setUserData({ ...userData, bio: e.target.value })} />
          </label>
          <br />
          <label>
            Work Experience
            <input type="text" value={workExp} onChange={e => setWorkExp(e.target.value)} />
          </label>
          <div className="list-button">
            <button type="button" onClick={workExpChange}>
              Add
            </button>
          </div>
          <br />
          <label>
            Education
            <input type="text" value={education} onChange={e => setEducation(e.target.value)} />
          </label>
          <div className="list-button">
            <button type="button" onClick={educationChange}>
              Add
            </button>
          </div>
          <br />
          <label>
            Skills
            <input type="text" value={skills} onChange={e => setSkills(e.target.value)} />
          </label>
          <div className="list-button">
            <button type="button" onClick={skillsChange}>
              Add
            </button>
          </div>
          <br />
          <label>
            Languages
            <input type="text" value={languages} onChange={e => setLanguages(e.target.value)} />
          </label>
          <div className="list-button">
            <button type="button" onClick={languagesChange}>
              Add
            </button>
          </div>
          <br />
          <label>
            Volunteering
            <textarea value={volunteering} onChange={e => setVolunteering(e.target.value)} />
          </label>
          <div className="list-button">
            <button type="button" onClick={volunteeringChange}>
              Add
            </button>
          </div>
          <br />
          <button type="submit">Save changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserProfile;
