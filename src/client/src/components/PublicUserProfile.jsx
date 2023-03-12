import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../css/publicuserprofile.css";
import { Context } from "../UserSession";

import swal from "sweetalert";
import { Link, Navigate } from "react-router-dom";
import { Select, MenuItem } from "@mui/material"; 
import { useNavigate } from "react-router-dom";

const PublicUserProfile = () => {
  //States
  const [publicUser, setPublicUser] = useState([
    {
      _id: "",
      firstname: "",
      lastname: "",
      volunteering: [],
      skills: [],
      workExp: [],
      bio: "",
      headLine: "",
      languages: [],
      education: [],
    },
  ]);

  //Get the search string from the user input
  let locationURL = useLocation().pathname;
  let profileId = useLocation().pathname.split("/")[3];

  //Global loginState
  const [login, setLogin] = useContext(Context);

  //Get id of logged in user
  const userID = sessionStorage.getItem("userID");

  //Having the loginState persist on all pages
  useEffect(() => {
    if (userID) {
      fetchSession();
    }
  }, []);

  //Having the loginState persist on all pages
  const fetchSession = async () => {
    try {
      if (userID) {
        setLogin({
          isLoggedIn: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Make the request once and only when locationURL changes
  useEffect(() => {
    fetchProfile();
  }, [locationURL]);

  const Clickme = async (userid) => {
    console.log(userid);
    axios
      .post(`http://localhost:9000/users/searchuserlist`, {
        _id: userid,
        firstname: sessionStorage.getItem("firstname"),
        lastname: sessionStorage.getItem("lastname"),
        userID :sessionStorage.getItem("userID"),
      })
      .then((response) => {
        swal("Congrats!", "You have successfully sent connection request!","success",{
          button:false,
          timer:1000
        });
      })
      .catch((error) => {
        console.log(error);
        //alert("Cannot connect");
      });
  };
  //HTTP Request in Backend to fetch user info
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/users/profile/${profileId}`
      );
      setPublicUser({
        _id: response.data._id,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        volunteering: response.data.volunteering,
        skills: response.data.skills,
        workExp: response.data.workExp,
        bio: response.data.bio,
        headLine: response.data.headLine,
        languages: response.data.languages,
        education: response.data.education,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {userID && publicUser ? (
        <div className="userProfileContainer">
          {/* User Information Component */}
          <div className="left">
            <div className="userInformation">
              <div className="userContainerProfile">
                <img
                  src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                  alt="default pic"
                  className="userProfilePic"
                ></img>
                <div className="userAboutSection">
                  <span className="userName">
                    {publicUser.firstname} {publicUser.lastname}
                  </span>
                  <br />
                  <p>{publicUser.headLine}</p>
                  <div className="connectButtonSection">
                    <button
                      className="connectButton"
                      onClick={() => Clickme(`${publicUser._id}`)}
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="userInformation">
              <span className="subTitle">Bio</span>
              <p className="userBio">{publicUser.bio}</p>
            </div>
            <div className="userJobInformation">
              <span className="subTitle">Experience</span>
              <ul className="elementList">
                {publicUser.workExp &&
                  publicUser.workExp.map((workExperience) => (
                    <li key={workExperience} className="jobInfo">
                      <img
                        src="https://png.pngtree.com/png-vector/20210207/ourlarge/pngtree-yellow-brown-mens-briefcase-clip-art-png-image_2882849.png"
                        alt="comapnyPic"
                        className="companyPic"
                      ></img>
                      <div>
                        <span>{workExperience}</span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="userJobInformation">
              <span className="subTitle">Education</span>
              <ul className="elementList">
                {publicUser.education &&
                  publicUser.education.map((education) => (
                    <li key={education} className="jobInfo">
                      <img
                        src="https://img.freepik.com/premium-vector/square-academic-cap-clipart-high-school-college-graduation-concept_302536-253.jpg?w=2000"
                        alt="comapnyPic"
                        className="companyPic"
                      ></img>
                      <div>
                        <span>{education}</span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="userKnowledgeInformation">
              <span className="subTitle">Skills</span>
              <ul className="elementList">
                {publicUser.skills &&
                  publicUser.skills.map((skill) => (
                    <li key={skill} className="jobInfo">
                      <p className="element">{skill}</p>
                    </li>
                  ))}{" "}
              </ul>
            </div>
            <div className="userKnowledgeInformation">
              <span className="subTitle">Languages</span>
              <ul className="elementList">
                {publicUser.languages &&
                  publicUser.languages.map((language) => (
                    <li key={language} className="jobInfo">
                      <p className="element">{language}</p>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="userKnowledgeInformation">
              <span className="subTitle">Volunteering</span>

              <ul className="elementList">
                <li className="jobInfo">
                  {publicUser.volunteering &&
                    publicUser.volunteering.map((volunteeringExp) => (
                      <li key={volunteeringExp} className="jobInfo">
                        <p className="element">{volunteeringExp}</p>
                      </li>
                    ))}{" "}
                </li>
              </ul>
            </div>
          </div>
          {/* User Connections  */}
          <div className="right">
            <span className="subTitle">Contacts</span>
            <br></br>
            <div>
              <ul>
                <l1 className="connectionsInfo">
                  <img
                    src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                    alt="comapnyPic"
                    className="companyPic"
                  ></img>
                  <div>
                    <span className="connectionName">John Doe</span>
                  </div>
                </l1>
                <l1 className="connectionsInfo">
                  <img
                    src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                    alt="comapnyPic"
                    className="companyPic"
                  ></img>
                  <div>
                    <span className="connectionName">John Doe</span>
                  </div>
                </l1>
                <l1 className="connectionsInfo">
                  <img
                    src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                    alt="comapnyPic"
                    className="companyPic"
                  ></img>
                  <div>
                    <span className="connectionName">John Doe</span>
                  </div>
                </l1>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>Please login to your account</h1>
      )}
    </div>
  );
};

export default PublicUserProfile;
